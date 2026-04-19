import { useState, useEffect } from 'react'
import { serviceService } from '../services/serviceService'

export function useServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await serviceService.getAll()
      setServices(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createService = async (data) => {
    try {
      const created = await serviceService.create(data)
      setServices(prev => [...prev, created])
      return created
    } catch (err) {
      setError(err.message)
      return null
    }
  }

  const updateService = async (id, data) => {
    try {
      const updated = await serviceService.update(id, data)
      setServices(prev => prev.map(s => s.id === id ? updated : s))
      return updated
    } catch (err) {
      setError(err.message)
      return null
    }
  }

  const deleteService = async (id) => {
    try {
      await serviceService.delete(id)
      setServices(prev => prev.filter(s => s.id !== id))
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  return {
    services,
    loading,
    error,
    refetch: fetchServices,
    createService,
    updateService,
    deleteService,
  }
}