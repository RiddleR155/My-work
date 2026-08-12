import { useEffect, useState } from 'react';
import { Skeleton } from '../../components/ui/Skeleton';
import { fetchCustomers } from '../../services/adminService';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers()
      .then(setCustomers)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-display text-xl text-charcoal-900 mb-6">Customers ({customers.length})</h1>

      {loading ? (
        <Skeleton className="h-96" />
      ) : (
        <div className="bg-white border border-charcoal-900/10 rounded overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-charcoal-700/60 border-b border-charcoal-900/10">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Phone</th>
                <th className="px-6 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id} className="border-b border-charcoal-900/5 last:border-0">
                  <td className="px-6 py-3 text-charcoal-900">{customer.name}</td>
                  <td className="px-6 py-3 text-charcoal-700/80">{customer.email}</td>
                  <td className="px-6 py-3 text-charcoal-700/80">{customer.phone || '—'}</td>
                  <td className="px-6 py-3 text-charcoal-700/70">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-charcoal-700/50">
                    No customers yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;
