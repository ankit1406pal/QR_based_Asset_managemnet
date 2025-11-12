import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAssetSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/assets", async (_req, res) => {
    try {
      const assets = await storage.getAssets();
      res.json(assets);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch assets" });
    }
  });

  app.post("/api/assets", async (req, res) => {
    try {
      const validatedData = insertAssetSchema.parse({
        ...req.body,
        date: new Date(req.body.date),
      });
      
      const asset = await storage.createAsset(validatedData);
      res.status(201).json(asset);
    } catch (error) {
      console.error("Error creating asset:", error);
      res.status(400).json({ error: "Invalid asset data" });
    }
  });

  app.put("/api/assets/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertAssetSchema.parse({
        ...req.body,
        date: new Date(req.body.date),
      });
      
      const updatedAsset = await storage.updateAsset(id, validatedData);
      
      if (!updatedAsset) {
        return res.status(404).json({ error: "Asset not found" });
      }
      
      res.json(updatedAsset);
    } catch (error) {
      console.error("Error updating asset:", error);
      res.status(400).json({ error: "Invalid asset data" });
    }
  });

  app.delete("/api/assets/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteAsset(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Asset not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting asset:", error);
      res.status(500).json({ error: "Failed to delete asset" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
