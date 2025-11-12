import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAssetSchema, type InsertAsset } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, QrCode, Save } from "lucide-react";

interface AssetFormProps {
  onSubmit: (data: InsertAsset) => void;
  defaultUsername?: string;
  editAsset?: InsertAsset & { id: string };
}

export default function AssetForm({ onSubmit, defaultUsername = "", editAsset }: AssetFormProps) {
  const isEditMode = !!editAsset;
  const form = useForm<InsertAsset>({
    resolver: zodResolver(insertAssetSchema),
    defaultValues: editAsset ? {
      pcName: editAsset.pcName,
      employeeNumber: editAsset.employeeNumber,
      username: editAsset.username,
      serialNumber: editAsset.serialNumber,
      macAddress: editAsset.macAddress,
      buybackStatus: editAsset.buybackStatus as "Pending" | "Approved" | "In Process" | "Completed",
      date: new Date(editAsset.date),
    } : {
      pcName: "",
      employeeNumber: "",
      username: defaultUsername,
      serialNumber: "",
      macAddress: "",
      buybackStatus: "Pending",
      date: new Date(),
    },
  });

  useEffect(() => {
    if (editAsset) {
      form.reset({
        pcName: editAsset.pcName,
        employeeNumber: editAsset.employeeNumber,
        username: editAsset.username,
        serialNumber: editAsset.serialNumber,
        macAddress: editAsset.macAddress,
        buybackStatus: editAsset.buybackStatus as "Pending" | "Approved" | "In Process" | "Completed",
        date: new Date(editAsset.date),
      });
    }
  }, [editAsset, form]);

  const handleSubmit = (data: InsertAsset) => {
    onSubmit(data);
  };

  const handleClear = () => {
    form.reset({
      pcName: "",
      employeeNumber: "",
      username: defaultUsername,
      serialNumber: "",
      macAddress: "",
      buybackStatus: "Pending",
      date: new Date(),
    });
  };

  return (
    <Card data-testid="card-asset-form">
      <CardHeader>
        <CardTitle className="text-2xl">{isEditMode ? "Edit Asset" : "New Asset Entry"}</CardTitle>
        <CardDescription>
          {isEditMode ? "Update asset information and regenerate QR code" : "Enter asset information to generate a QR code for tracking"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="pcName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PC Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., DESKTOP-001"
                        {...field}
                        data-testid="input-pc-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employeeNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., EMP-12345"
                        {...field}
                        data-testid="input-employee-number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initiating User</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your username"
                        {...field}
                        data-testid="input-username"
                      />
                    </FormControl>
                    <FormDescription>
                      User initiating the buyback
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serial Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., SN123456789"
                        {...field}
                        data-testid="input-serial-number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="macAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MAC Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 00:1A:2B:3C:4D:5E"
                        {...field}
                        data-testid="input-mac-address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="buybackStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Buyback Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      data-testid="select-buyback-status"
                    >
                      <FormControl>
                        <SelectTrigger data-testid="trigger-buyback-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="In Process">In Process</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-end">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                            data-testid="button-date-picker"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="submit"
                className="flex-1"
                data-testid={isEditMode ? "button-save-changes" : "button-generate-qr"}
              >
                {isEditMode ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <QrCode className="mr-2 h-4 w-4" />
                    Generate QR Code
                  </>
                )}
              </Button>
              {!isEditMode && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClear}
                  className="flex-1 sm:flex-none"
                  data-testid="button-clear-form"
                >
                  Clear Form
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
