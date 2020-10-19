import { FactoryProvider } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';

export const mongoProvider: FactoryProvider = {
  provide: Db,
  useFactory: async () => {
    // Connection URL
    const uri = process.env.DATABASE_URI;

    // Database Name
    const dbName = process.env.DATABASE_NAME;

    // Use connect method to connect to the server
    const client = await MongoClient.connect(uri, {
      useUnifiedTopology: true,
    });

    return client.db(dbName);
  },
};
