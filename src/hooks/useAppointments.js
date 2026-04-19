import { useState, useEffect } from 'react'
import { appointmentService } from '../services/appointmentService'

export function useAppointments(userId = null) {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAppointments()
  }, [userId])

  const fetchAppointments = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = userId
        ? await appointmentService.getByUser(userId)
        : await appointmentService.getAll()
      setAppointments(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await appointmentService.updateStatus(id, status)
      setAppointments(prev =>
        prev.map(a => a.id === id ? { ...a, status } : a)
      )
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  const deleteAppointment = async (id) => {
    try {
      await appointmentService.delete(id)
      setAppointments(prev => prev.filter(a => a.id !== id))
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  const createAppointment = async (data) => {
    try {
      const created = await appointmentService.create(data)
      setAppointments(prev => [...prev, created])
      return created
    } catch (err) {
      setError(err.message)
      return null
    }
  }

  return {
    appointments,
    loading,
    error,
    refetch: fetchAppointments,
    updateStatus,
    deleteAppointment,
    createAppointment,
  }
}