"use client"

import { useState, useEffect } from 'react';
import { apiClient } from "@/services/api";
import { withAuth } from '@/components/withAuth';

function SchedulerDashboard() {
  const [schedulerStatus, setSchedulerStatus] = useState(null);
  const [mangaCheckStatus, setMangaCheckStatus] = useState(null);
  const [intervalMinutes, setIntervalMinutes] = useState(30);
  const [isLoading, setIsLoading] = useState({
    status: false,
    start: false,
    stop: false,
    interval: false
  });
  const [message, setMessage] = useState('');

  // Scheduler durumunu çek
  const fetchSchedulerStatus = async () => {
    setIsLoading(prev => ({...prev, status: true}));
    try {
      const response = await apiClient.get('/api/scheduler/status');
      console.log('scheduler response: ', response);
      if (response.success) {
        setSchedulerStatus(response.data.data);
      }
    } catch (error) {
      setMessage('Durum bilgisi alınamadı');
    } finally {
      setIsLoading(prev => ({...prev, status: false}));
    }
  };

  // Manga check durumunu çek
  const fetchMangaCheckStatus = async () => {
    try {
      const response = await apiClient.get('/api/scheduler/manga-check/status');
      setMangaCheckStatus(response.data.data);
    } catch (error) {
      setMessage('Manga check durumu alınamadı');
    }
  };

  // Scheduler'ı başlat
  const startScheduler = async () => {
    setIsLoading(prev => ({...prev, start: true}));
    try {
      const response = await apiClient.post('/api/scheduler/start');
      setMessage(response.data.data.message);
      if (response.data.success) {
        // Durumu yenile
        setTimeout(() => {
          fetchSchedulerStatus();
          fetchMangaCheckStatus();
        }, 1000);
      }
    } catch (error) {
      setMessage('Scheduler başlatılamadı');
    } finally {
      setIsLoading(prev => ({...prev, start: false}));
    }
  };

  // Scheduler'ı durdur
  const stopScheduler = async () => {
    setIsLoading(prev => ({...prev, stop: true}));
    try {
      const response = await apiClient.post('/api/scheduler/stop');
      setMessage(response.data.data.message);
      if (response.data.success) {
        // Durumu yenile
        setTimeout(() => {
          fetchSchedulerStatus();
          fetchMangaCheckStatus();
        }, 1000);
      }
    } catch (error) {
      setMessage('Scheduler durdurulamadı');
    } finally {
      setIsLoading(prev => ({...prev, stop: false}));
    }
  };

  // Interval güncelle
  const updateInterval = async () => {
    setIsLoading(prev => ({...prev, interval: true}));
    try {
      const response = await apiClient.put('/api/scheduler/manga-check/interval', { intervalMinutes });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Interval güncellenemedi');
    } finally {
      setIsLoading(prev => ({...prev, interval: false}));
    }
  };

  // İlk yüklemede verileri çek
  useEffect(() => {
    fetchSchedulerStatus();
    fetchMangaCheckStatus();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Scheduler Yönetim Paneli</h1>
        
        {message && (
          <div className={`p-4 mb-6 rounded-lg ${message.includes('başarılı') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scheduler Durum Kartı */}
          <div className="dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl text-white font-semibold mb-4">Scheduler Durumu</h2>
            
            {isLoading.status ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            ) : schedulerStatus ? (
              <div className='dark:bg-gray-800'>
                <div className="flex items-center mb-4">
                  <div className={`w-3 h-3 rounded-full mr-2 ${schedulerStatus.isRunning ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span>{schedulerStatus.isRunning ? 'Çalışıyor' : 'Durdurulmuş'}</span>
                </div>
                
                <p className="text-white mb-2">Aktif Görev Sayısı: {schedulerStatus.activeTasksCount}</p>
                
                {schedulerStatus.activeTasksCount > 0 && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Aktif Görevler:</h3>
                    <ul className="bg-gray-50 rounded divide-y">
                      {schedulerStatus.activeTasks.map((task, index) => (
                        <li key={index} className="p-2 flex items-center dark:bg-gray-700">
                          <div className={`w-2 h-2 rounded-full mr-2 ${task.isRunning ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span>{task.sourceId}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-white">Durum yüklenemedi</p>
            )}
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={startScheduler}
                disabled={isLoading.start || (schedulerStatus && schedulerStatus.isRunning)}
                className={`btn btn-success px-4 py-2 rounded ${isLoading.start || (schedulerStatus && schedulerStatus.isRunning) ? 'bg-gray-300 cursor-not-allowed' : 'hover:bg-green-600 text-white'}`}
              >
                {isLoading.start ? 'Başlatılıyor...' : 'Başlat'}
              </button>
              
              <button
                onClick={stopScheduler}
                disabled={isLoading.stop || (schedulerStatus && !schedulerStatus.isRunning)}
                className={`btn btn-error px-4 py-2 rounded ${isLoading.stop || (schedulerStatus && !schedulerStatus.isRunning) ? 'cursor-not-allowed' : 'hover:bg-red-600 text-white'}`}
              >
                {isLoading.stop ? 'Durduruluyor...' : 'Durdur'}
              </button>
            </div>
          </div>
          
          {/* Manga Check Durum Kartı */}
          <div className="dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl text-white font-semibold mb-4">Manga Check Durumu</h2>
            
            {mangaCheckStatus ? (
              <div className="flex items-center mb-6">
                <div className={`w-3 h-3 rounded-full mr-2 ${mangaCheckStatus.isRunning ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>{mangaCheckStatus.isRunning ? 'Çalışıyor' : 'Durdurulmuş'}</span>
              </div>
            ) : (
              <p className='text-white'>Durum yükleniyor...</p>
            )}
            
            <div className="mt-4">
              <label htmlFor="interval" className="block text-sm font-medium text-white mb-1">
                Kontrol Aralığı (dakika)
              </label>
              <div className="flex">
                <input
                  type="number"
                  id="interval"
                  min="1"
                  value={intervalMinutes}
                  onChange={(e) => setIntervalMinutes(parseInt(e.target.value))}
                  className="flex-1 border border-gray-600 px-3 py-2 mr-2 rounded"
                />
                <button
                  onClick={updateInterval}
                  disabled={isLoading.interval}
                  className={`btn btn-primary px-4 py-2 rounded ${isLoading.interval ? 'cursor-not-allowed' : 'hover:bg-blue-600 text-white'}`}
                >
                  {isLoading.interval ? 'Güncelleniyor...' : 'Güncelle'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              fetchSchedulerStatus();
              fetchMangaCheckStatus();
            }}
            className="btn btn-info px-4 py-2 hover:bg-blue-600 rounded-md text-white"
          >
            Durumu Yenile
          </button>
        </div>
      </div>
    </div>
  );
}

export default withAuth(SchedulerDashboard);