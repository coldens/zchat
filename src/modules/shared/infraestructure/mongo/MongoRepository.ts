import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export abstract class MongoRepository {
  constructor(
    @Inject(Db)
    private db: Db,
  ) {}

  protected abstract moduleName(): string;

  collection(name?: string) {
    return this.db.collection(name ?? this.moduleName());
  }

  protected async updateOne(document: document): Promise<void> {
    const now = new Date();
    const collection = this.collection();
    await collection.updateOne(
      { _id: document._id },
      { $set: { ...document, lastModified: now } },
    );
  }

  protected async insertOne(document: document) {
    const now = new Date();
    const collection = this.collection();
    await collection.insertOne({
      ...document,
      lastModified: now,
      createdAt: now,
    });
  }

  protected async updateOrInsert(document: document) {
    const now = new Date();
    const collection = this.collection();
    await collection.updateOne(
      { _id: document._id },
      {
        $set: { ...document, lastModified: now },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true },
    );
  }
}

type document = {
  _id: string;
};
