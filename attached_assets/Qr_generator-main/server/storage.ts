import { type Asset, type InsertAsset } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAssets(): Promise<Asset[]>;
  getAsset(id: string): Promise<Asset | undefined>;
  createAsset(asset: InsertAsset): Promise<Asset>;
  updateAsset(id: string, asset: InsertAsset): Promise<Asset | undefined>;
  deleteAsset(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private assets: Map<string, Asset>;

  constructor() {
    this.assets = new Map();
  }

  async getAssets(): Promise<Asset[]> {
    return Array.from(this.assets.values());
  }

  async getAsset(id: string): Promise<Asset | undefined> {
    return this.assets.get(id);
  }

  async createAsset(insertAsset: InsertAsset): Promise<Asset> {
    const id = randomUUID();
    const asset: Asset = {
      ...insertAsset,
      id,
      createdAt: new Date(),
    };
    this.assets.set(id, asset);
    return asset;
  }

  async updateAsset(id: string, insertAsset: InsertAsset): Promise<Asset | undefined> {
    const existingAsset = this.assets.get(id);
    if (!existingAsset) {
      return undefined;
    }
    
    const updatedAsset: Asset = {
      ...insertAsset,
      id,
      createdAt: existingAsset.createdAt,
    };
    this.assets.set(id, updatedAsset);
    return updatedAsset;
  }

  async deleteAsset(id: string): Promise<boolean> {
    return this.assets.delete(id);
  }
}

export const storage = new MemStorage();
