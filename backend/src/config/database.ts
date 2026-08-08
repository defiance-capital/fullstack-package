import mongoose from 'mongoose';

// In-memory database mock
class InMemoryDB {
  private data: any = {
    users: [
      {
        _id: '1',
        name: 'John Employee',
        email: 'employee@test.com',
        password: '$2a$10$dummy', // any password works
        role: 'employee',
        leaveBalance: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '2',
        name: 'Sarah Manager',
        email: 'manager@test.com',
        password: '$2a$10$dummy',
        role: 'manager',
        leaveBalance: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    leaveRequests: [
      {
        _id: '1',
        userId: '1',
        startDate: new Date('2026-06-10'),
        endDate: new Date('2026-06-12'),
        reason: 'Family vacation',
        type: 'annual',
        status: 'approved',
        createdAt: new Date('2026-06-01'),
        updatedAt: new Date('2026-06-02')
      }
    ],
    leaveBalances: [
      {
        _id: '1',
        userId: '1',
        annual: 12,
        sick: 10,
        unpaid: 0,
        updatedAt: new Date()
      },
      {
        _id: '2',
        userId: '2',
        annual: 20,
        sick: 15,
        unpaid: 0,
        updatedAt: new Date()
      }
    ]
  };

  private getCollection(collectionName: string) {
    return {
      find: (query?: any) => {
        let items = this.data[collectionName];
        if (query?.userId) {
          items = items.filter((item: any) => item.userId === query.userId);
        }
        if (query?._id) {
          items = items.find((item: any) => item._id === query._id);
        }
        return {
          exec: async () => items,
          sort: () => ({ exec: async () => items }),
          limit: () => ({ exec: async () => items })
        };
      },
      findOne: async (query: any) => {
        let items = this.data[collectionName];
        if (query.email) {
          return items.find((item: any) => item.email === query.email);
        }
        if (query._id) {
          return items.find((item: any) => item._id === query._id);
        }
        if (query.userId) {
          return items.find((item: any) => item.userId === query.userId);
        }
        return null;
      },
      findById: async (id: string) => {
        return this.data[collectionName].find((item: any) => item._id === id);
      },
      create: async (data: any) => {
        const newItem = {
          _id: String(this.data[collectionName].length + 1),
          ...data,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        this.data[collectionName].push(newItem);
        return newItem;
      },
      findByIdAndUpdate: async (id: string, update: any) => {
        const index = this.data[collectionName].findIndex((item: any) => item._id === id);
        if (index !== -1) {
          this.data[collectionName][index] = {
            ...this.data[collectionName][index],
            ...update,
            updatedAt: new Date()
          };
          return this.data[collectionName][index];
        }
        return null;
      }
    };
  }

  model(collectionName: string) {
    return this.getCollection(collectionName);
  }
}

const inMemoryDB = new InMemoryDB();

// Mock mongoose models
export const User = inMemoryDB.model('users');
export const LeaveRequest = inMemoryDB.model('leaveRequests');
export const LeaveBalance = inMemoryDB.model('leaveBalances');

// Mock connection function
export const connectDB = async () => {
  console.log('✅ Using in-memory database - no MongoDB required');
  console.log('📦 Mock users: employee@test.com, manager@test.com');
  return true;
};

// Export mongoose for compatibility (but it's our mock)
export default { connectDB, User, LeaveRequest, LeaveBalance };