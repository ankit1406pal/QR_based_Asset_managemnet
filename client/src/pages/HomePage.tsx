import { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import AssetForm from "@/components/AssetForm";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertAsset, Asset } from "@shared/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function HomePage() {
  const [generatedAsset, setGeneratedAsset] = useState<(InsertAsset & { id: string }) | null>(null);
  const [editingAsset, setEditingAsset] = useState<(Asset & InsertAsset) | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<{ data: InsertAsset; duplicates: string[] } | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const [, params] = useRoute("/edit/:id");

  const { data: allAssets = [] } = useQuery<Asset[]>({
    queryKey: ["/api/assets"],
  });

  useEffect(() => {
    if (params?.id) {
      const asset = allAssets.find((a) => a.id === params.id);
      if (asset) {
        setEditingAsset(asset as Asset & InsertAsset);
      }
    } else {
      setEditingAsset(null);
    }
  }, [params, allAssets]);

  const createAssetMutation = useMutation({
    mutationFn: async (data: InsertAsset) => {
      const response = await apiRequest("POST", "/api/assets", {
        ...data,
        date: data.date.toISOString(),
      });
      return await response.json() as Asset;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/assets"] });
      setGeneratedAsset({
        id: data.id,
        pcName: data.pcName,
        employeeNumber: data.employeeNumber,
        username: data.username,
        serialNumber: data.serialNumber,
        macAddress: data.macAddress,
        buybackStatus: data.buybackStatus as "Pending" | "Approved" | "In Process" | "Completed",
        date: new Date(data.date),
      });
      toast({
        title: "Asset Created",
        description: "QR code generated successfully. Asset added to dashboard.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create asset. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateAssetMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertAsset }) => {
      const response = await apiRequest("PUT", `/api/assets/${id}`, {
        ...data,
        date: data.date.toISOString(),
      });
      return await response.json() as Asset;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/assets"] });
      setGeneratedAsset({
        id: data.id,
        pcName: data.pcName,
        employeeNumber: data.employeeNumber,
        username: data.username,
        serialNumber: data.serialNumber,
        macAddress: data.macAddress,
        buybackStatus: data.buybackStatus as "Pending" | "Approved" | "In Process" | "Completed",
        date: new Date(data.date),
      });
      setEditingAsset(null);
      toast({
        title: "Asset Updated",
        description: "Changes saved successfully. QR code regenerated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update asset. Please try again.",
        variant: "destructive",
      });
    },
  });

  const checkForDuplicates = (data: InsertAsset, excludeId?: string): string[] => {
    const duplicates: string[] = [];
    const otherAssets = allAssets.filter((a) => a.id !== excludeId);

    // Check all fields for duplicates as requested
    const hasSerialDuplicate = otherAssets.some((a) => a.serialNumber === data.serialNumber);
    const hasMacDuplicate = otherAssets.some((a) => a.macAddress === data.macAddress);
    const hasPcNameDuplicate = otherAssets.some((a) => a.pcName === data.pcName);
    const hasEmployeeNumberDuplicate = otherAssets.some((a) => a.employeeNumber === data.employeeNumber);
    const hasUsernameDuplicate = otherAssets.some((a) => a.username === data.username);

    if (hasSerialDuplicate) {
      duplicates.push(`Serial Number: ${data.serialNumber}`);
    }
    if (hasMacDuplicate) {
      duplicates.push(`MAC Address: ${data.macAddress}`);
    }
    if (hasPcNameDuplicate) {
      duplicates.push(`PC Name: ${data.pcName}`);
    }
    if (hasEmployeeNumberDuplicate) {
      duplicates.push(`Employee Number: ${data.employeeNumber}`);
    }
    if (hasUsernameDuplicate) {
      duplicates.push(`Username: ${data.username}`);
    }

    return duplicates;
  };

  const handleFormSubmit = (data: InsertAsset) => {
    const duplicates = checkForDuplicates(data, editingAsset?.id);

    if (duplicates.length > 0) {
      setDuplicateWarning({ data, duplicates });
      return;
    }

    proceedWithSubmit(data);
  };

  const proceedWithSubmit = (data: InsertAsset) => {
    if (editingAsset) {
      updateAssetMutation.mutate({ id: editingAsset.id, data });
    } else {
      createAssetMutation.mutate(data);
    }
  };

  const handleDuplicateConfirm = () => {
    if (duplicateWarning) {
      proceedWithSubmit(duplicateWarning.data);
      setDuplicateWarning(null);
    }
  };

  const handleDuplicateCancel = () => {
    setDuplicateWarning(null);
  };

  const handleClose = () => {
    setGeneratedAsset(null);
    setEditingAsset(null);
    setLocation("/dashboard");
  };

  return (
    <div className="space-y-8">
      {!generatedAsset ? (
        <AssetForm 
          onSubmit={handleFormSubmit} 
          defaultUsername="admin" 
          editAsset={editingAsset || undefined}
        />
      ) : (
        <QRCodeDisplay assetData={generatedAsset} onClose={handleClose} />
      )}

      <AlertDialog open={!!duplicateWarning} onOpenChange={(open) => !open && handleDuplicateCancel()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Duplicate Entry Detected</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>The following fields match existing assets:</p>
              <ul className="list-disc list-inside space-y-1">
                {duplicateWarning?.duplicates.map((dup, idx) => (
                  <li key={idx} className="text-destructive font-medium">{dup}</li>
                ))}
              </ul>
              <p className="pt-2">Do you want to proceed anyway?</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-duplicate">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDuplicateConfirm} data-testid="button-confirm-duplicate">
              Proceed Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
