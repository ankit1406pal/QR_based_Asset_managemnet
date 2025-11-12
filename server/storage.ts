import { assets, type Asset, type InsertAsset } from "@shared/schema";
import { db } from "./db";
import { eq, or } from "drizzle-orm";

export interface IStorage {
  getAssets(): Promise<Asset[]>;
  getAsset(id: string): Promise<Asset | undefined>;
  createAsset(asset: InsertAsset): Promise<Asset>;
  updateAsset(id: string, asset: InsertAsset): Promise<Asset | undefined>;
  updateAssetStatus(id: string, status: string): Promise<Asset | undefined>;
  deleteAsset(id: string): Promise<boolean>;
  checkDuplicates(asset: InsertAsset): Promise<{
    isDuplicate: boolean;
    duplicateFields: string[];
    existingAssets: Asset[];
  }>;
}

export class DatabaseStorage implements IStorage {
  async getAssets(): Promise<Asset[]> {
    return await db.select().from(assets);
  }

  async getAsset(id: string): Promise<Asset | undefined> {
    const [asset] = await db.select().from(assets).where(eq(assets.id, id));
    return asset || undefined;
  }

  async createAsset(insertAsset: InsertAsset): Promise<Asset> {
    const [asset] = await db
      .insert(assets)
      .values(insertAsset)
      .returning();
    return asset;
  }

  async updateAsset(id: string, insertAsset: InsertAsset): Promise<Asset | undefined> {
    const [updatedAsset] = await db
      .update(assets)
      .set(insertAsset)
      .where(eq(assets.id, id))
      .returning();
    return updatedAsset || undefined;
  }

  async updateAssetStatus(id: string, status: string): Promise<Asset | undefined> {
    const [updatedAsset] = await db
      .update(assets)
      .set({ buybackStatus: status })
      .where(eq(assets.id, id))
      .returning();
    return updatedAsset || undefined;
  }

  async deleteAsset(id: string): Promise<boolean> {
    const result = await db.delete(assets).where(eq(assets.id, id)).returning();
    return result.length > 0;
  }

  async checkDuplicates(asset: InsertAsset): Promise<{
    isDuplicate: boolean;
    duplicateFields: string[];
    existingAssets: Asset[];
  }> {
    // Check for duplicates across multiple fields
    const allAssets = await db.select().from(assets);
    
    const duplicateFields: string[] = [];
    const existingAssets: Asset[] = [];

    for (const existing of allAssets) {
      const matches: string[] = [];
      
      if (existing.serialNumber === asset.serialNumber) {
        matches.push('Serial Number');
      }
      if (existing.macAddress === asset.macAddress) {
        matches.push('MAC Address');
      }
      if (existing.pcName === asset.pcName) {
        matches.push('PC Name');
      }
      if (existing.employeeNumber === asset.employeeNumber) {
        matches.push('Employee Number');
      }
      if (existing.username === asset.username) {
        matches.push('Username');
      }

      if (matches.length > 0) {
        matches.forEach(field => {
          if (!duplicateFields.includes(field)) {
            duplicateFields.push(field);
          }
        });
        if (!existingAssets.find(a => a.id === existing.id)) {
          existingAssets.push(existing);
        }
      }
    }

    return {
      isDuplicate: duplicateFields.length > 0,
      duplicateFields,
      existingAssets
    };
  }
}

export const storage = new DatabaseStorage();
