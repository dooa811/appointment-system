import { useState, useEffect } from 'react'
import { serviceService } from '../services/serviceService'

export function useDoctors(serviceId = null) {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDoctors()
  }, [serviceId])

  const fetchDoctors = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await serviceService.getAllDoctors()
      const filtered = serviceId
        ? data.filter(d => d.serviceId === serviceId)
        : data
      setDoctors(filtered)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    doctors,
    loading,
    error,
    refetch: fetchDoctors,
  }
}