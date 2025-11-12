import { useState } from "react";
import { useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Loader2, AlertCircle, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StatusBadge from "@/components/StatusBadge";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Asset } from "@shared/schema";

export default function StatusUpdatePage() {
  const [, params] = useRoute("/status/:id");
  const assetId = params?.id;
  const [newStatus, setNewStatus] = useState<string>("");
  const { toast } = useToast();

  // Fetch asset data
  const { data: asset, isLoading, error } = useQuery<Asset>({
    queryKey: [`/api/assets/${assetId}`],
    enabled: !!assetId,
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async (status: string) => {
      return await apiRequest('PATCH', `/api/assets/${assetId}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/assets/${assetId}`] });
      queryClient.invalidateQueries({ queryKey: ['/api/assets'] });
      toast({
        title: "Status Updated",
        description: "Asset buyback status has been successfully updated.",
      });
      setNewStatus("");
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update asset status. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleUpdateStatus = () => {
    if (newStatus) {
      updateStatusMutation.mutate(newStatus);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !asset) {
    return (
      <Card className="max-w-2xl mx-auto" data-testid="card-error">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <div>
              <CardTitle className="text-2xl">Asset Not Found</CardTitle>
              <CardDescription>
                The asset you're looking for could not be found.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Please check the QR code and try again, or contact IT support for assistance.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card data-testid="card-asset-details">
        <CardHeader>
          <div className="flex items-center gap-3">
            <QrCode className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">Asset Status Update</CardTitle>
              <CardDescription>
                Update the buyback status for this asset
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-md">
            <div>
              <div className="text-sm text-muted-foreground mb-1">PC Name</div>
              <div className="font-semibold" data-testid="text-pc-name">{asset.pcName}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Employee Number</div>
              <div className="font-semibold" data-testid="text-employee-number">{asset.employeeNumber}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Serial Number</div>
              <div className="font-mono text-sm" data-testid="text-serial-number">{asset.serialNumber}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">MAC Address</div>
              <div className="font-mono text-sm" data-testid="text-mac-address">{asset.macAddress}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Initiating User</div>
              <div data-testid="text-username">{asset.username}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Date</div>
              <div data-testid="text-date">{new Date(asset.date).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="space-y-4 p-4 border rounded-md">
            <div>
              <div className="text-sm font-medium mb-2">Current Status</div>
              <StatusBadge status={asset.buybackStatus as "Pending" | "Approved" | "In Process" | "Completed"} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status-select">Update Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus} data-testid="select-new-status">
                <SelectTrigger id="status-select" data-testid="trigger-new-status">
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="In Process">In Process</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleUpdateStatus}
              disabled={!newStatus || newStatus === asset.buybackStatus || updateStatusMutation.isPending}
              className="w-full"
              data-testid="button-update-status"
            >
              {updateStatusMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Update Status
                </>
              )}
            </Button>
          </div>

          {updateStatusMutation.isSuccess && (
            <div className="flex items-center gap-2 p-4 bg-primary/10 text-primary rounded-md">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">Status updated successfully!</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">
            This page is designed for quick status updates via QR code scanning.
            For full asset management, visit the main dashboard.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
