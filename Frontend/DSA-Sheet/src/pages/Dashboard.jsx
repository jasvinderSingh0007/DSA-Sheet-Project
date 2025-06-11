import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Dashboard() {
  const [topics, setTopics] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [openTopicId, setOpenTopicId] = useState(null);
  const [userName, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTopics() {
      try {
        const { data } = await api.get('/topics');
        setTopics(data.topics);
        setCompleted(data.completed);
        setUsername(data.name);
      } catch (error) {
        alert('Session expired. Please login again.');
        Cookies.remove('accessToken');
        navigate('/');
      }
    }

    fetchTopics();
  }, []);

  const toggleProblem = async (Name) => {
    await api.post('/topics/mark', { problemName: Name });
    setCompleted((prev) =>
      prev.includes(Name)
        ? prev.filter((name) => name !== Name)
        : [...prev, Name]
    );
  };

  const toggleAccordion = (id) => {
    setOpenTopicId(openTopicId === id ? null : id);
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {}
    Cookies.remove('accessToken');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-[#1f1f1f] font-sans">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-50 border-b">
        <h1 className="text-2xl font-bold text-[#333]">DSA Tracker</h1>
        <div className="flex items-center gap-5">
          <span className="text-sm text-[#555]">Welcome, <strong>{userName}</strong></span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-[#ffe4e6] text-[#b91c1c] border border-[#fda4af] rounded-md text-sm font-medium hover:bg-[#fecdd3] transition duration-200"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="p-6 max-w-6xl mx-auto">
        {topics.map((topic) => (
          <div key={topic._id} className="mb-6 border rounded-xl bg-white shadow-md overflow-hidden">
            <button
              onClick={() => toggleAccordion(topic._id)}
              className="w-full text-left p-4 bg-[#e0f2fe] hover:bg-[#bae6fd] font-semibold text-[#0c4a6e] text-lg border-b transition"
            >
              {topic.title}
            </button>
            {openTopicId === topic._id && (
              <div className="overflow-x-auto">
                <table className="w-full text-left table-auto text-sm">
                  <thead className="bg-[#f8fafc] text-[#374151]">
                    <tr>
                      <th className="p-3"></th>
                      <th className="p-3">Name</th>
                      <th className="p-3">LeetCode</th>
                      <th className="p-3">YouTube</th>
                      <th className="p-3">Article</th>
                      <th className="p-3">Level</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topic.problems.map((p) => (
                      <tr key={p.name} className="border-t hover:bg-[#f1f5f9] transition-all">
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={completed.includes(p.name)}
                            onChange={() => toggleProblem(p.name)}
                            className="accent-[#0ea5e9] w-4 h-4"
                          />
                        </td>
                        <td className="p-3 font-medium">{p.name}</td>
                        <td className="p-3">
                          <a href={p.leetcode} target="_blank" rel="noreferrer" className="text-[#2563eb] hover:underline">Link</a>
                        </td>
                        <td className="p-3">
                          <a href={p.youtube} target="_blank" rel="noreferrer" className="text-[#2563eb] hover:underline">Link</a>
                        </td>
                        <td className="p-3">
                          <a href={p.article} target="_blank" rel="noreferrer" className="text-[#2563eb] hover:underline">Link</a>
                        </td>
                        <td className="p-3">{p.level}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            completed.includes(p.name)
                              ? 'bg-[#dcfce7] text-[#15803d]'
                              : 'bg-[#fef9c3] text-[#92400e]'
                          }`}>
                            {completed.includes(p.name) ? 'Done' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
