import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import type { InsertAsset } from "@shared/schema";

interface QRCodeDisplayProps {
  assetData: InsertAsset & { id: string };
  onClose?: () => void;
}

export default function QRCodeDisplay({ assetData, onClose }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    const generateQR = async () => {
      if (!canvasRef.current) return;

      // Generate URL to status update page
      const baseUrl = window.location.origin;
      const statusUrl = `${baseUrl}/status/${assetData.id}`;
      const qrData = statusUrl;

      try {
        await QRCode.toCanvas(canvasRef.current, qrData, {
          width: 300,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });

        const dataUrl = canvasRef.current.toDataURL("image/png");
        setQrDataUrl(dataUrl);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQR();
  }, [assetData]);

  const handleDownload = () => {
    if (!qrDataUrl) return;

    const link = document.createElement("a");
    link.download = `asset-qr-${assetData.serialNumber}.png`;
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <Card data-testid="card-qr-display">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-chart-5" />
          <CardTitle className="text-2xl">QR Code Generated</CardTitle>
        </div>
        <CardDescription>
          Scan this QR code to update the asset's buyback status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            className="rounded-md border border-border"
            data-testid="canvas-qr-code"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">PC Name</div>
            <div className="font-medium" data-testid="text-pc-name">{assetData.pcName}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Employee Number</div>
            <div className="font-medium" data-testid="text-employee-number">{assetData.employeeNumber}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Initiating User</div>
            <div className="font-medium" data-testid="text-username">{assetData.username}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Serial Number</div>
            <div className="font-medium font-mono" data-testid="text-serial-number">{assetData.serialNumber}</div>
          </div>
          <div>
            <div className="text-muted-foreground">MAC Address</div>
            <div className="font-medium font-mono" data-testid="text-mac-address">{assetData.macAddress}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Status</div>
            <div className="mt-1">
              <StatusBadge status={assetData.buybackStatus} />
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Date</div>
            <div className="font-medium" data-testid="text-date">
              {new Date(assetData.date).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleDownload}
            className="flex-1"
            data-testid="button-download-qr"
          >
            <Download className="mr-2 h-4 w-4" />
            Download QR Code
          </Button>
          {onClose && (
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 sm:flex-none"
              data-testid="button-close"
            >
              Close
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
