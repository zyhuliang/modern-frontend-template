import { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Loading } from '../components/Loading';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDebounce } from '../hooks/useDebounce';
import { get } from '../lib/api';
import type { User } from '../types';

export const ApiDemo = () => {
  const [userId, setUserId] = useLocalStorage<string>('api-demo-user-id', '1');
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedUserId = useDebounce(userId, 500);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await get<User>(`https://jsonplaceholder.typicode.com/users/${debouncedUserId}`);
      setUserData(data);
    } catch {
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">API 演示</h1>

      <Card className="max-w-2xl mx-auto mb-6">
        <h2 className="text-xl font-bold mb-4">获取用户信息</h2>
        <div className="flex gap-4 mb-4">
          <Input
            label="用户 ID (1-10)"
            type="number"
            min="1"
            max="10"
            value={userId}
            onChange={e => setUserId(e.target.value)}
          />
          <Button onClick={fetchUser} className="mt-6">
            {loading ? '加载中...' : '获取'}
          </Button>
        </div>
      </Card>

      {loading && <Loading size="lg" />}

      {error && (
        <Card className="max-w-2xl mx-auto mb-6 bg-red-50 dark:bg-red-900/20">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </Card>
      )}

      {userData && !loading && (
        <Card className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4">用户详情</h2>
          <div className="space-y-2">
            <p><strong>ID:</strong> {userData.id}</p>
            <p><strong>姓名:</strong> {userData.name}</p>
            <p><strong>用户名:</strong> {userData.username}</p>
            <p><strong>邮箱:</strong> {userData.email}</p>
            <p><strong>电话:</strong> {userData.phone}</p>
            <p><strong>网站:</strong> {userData.website}</p>
            <p><strong>公司:</strong> {userData.company?.name}</p>
          </div>
        </Card>
      )}
    </div>
  );
};
