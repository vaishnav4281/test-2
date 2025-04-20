"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pencil, Trash2, Plus, Save } from "lucide-react"

interface Policy {
  id: number
  name: string
  type: string
  minAge: number
  maxAge: number
  term: string
  minSum: string
  description: string
  image: string
}

// Mock data for policies
const mockPolicies: Policy[] = [
  {
    id: 1,
    name: "LIC Jeevan Anand",
    type: "Endowment Plan",
    minAge: 18,
    maxAge: 50,
    term: "15 to 35 years",
    minSum: "₹1,00,000",
    description:
      "A popular endowment plan that provides life cover during the policy term and even after the maturity of the policy.",
    image: "/placeholder.svg?height=300&width=500&text=Jeevan+Anand",
  },
  {
    id: 2,
    name: "LIC Tech Term",
    type: "Term Plan",
    minAge: 18,
    maxAge: 65,
    term: "10 to 40 years",
    minSum: "₹50,00,000",
    description:
      "A pure protection plan that provides high coverage at affordable premiums with online purchase option.",
    image: "/placeholder.svg?height=300&width=500&text=Tech+Term",
  },
  {
    id: 3,
    name: "LIC Jeevan Labh",
    type: "Endowment Plan",
    minAge: 8,
    maxAge: 59,
    term: "16, 21, 25 years",
    minSum: "₹2,00,000",
    description:
      "A limited premium payment endowment plan that provides financial protection against death during policy term.",
    image: "/placeholder.svg?height=300&width=500&text=Jeevan+Labh",
  },
]

export default function AdminPolicies() {
  const [policies, setPolicies] = useState<Policy[]>(mockPolicies)
  const [editingPolicy, setEditingPolicy] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    minAge: "",
    maxAge: "",
    term: "",
    minSum: "",
    description: ""
  })

  const handleEdit = (policy: Policy) => {
    setEditingPolicy(policy.id)
    setFormData({
      name: policy.name,
      type: policy.type,
      minAge: policy.minAge.toString(),
      maxAge: policy.maxAge.toString(),
      term: policy.term,
      minSum: policy.minSum,
      description: policy.description
    })
  }

  const handleSave = () => {
    setPolicies(policies.map(policy => 
      policy.id === editingPolicy 
        ? { 
            ...policy, 
            name: formData.name,
            type: formData.type,
            minAge: Number.parseInt(formData.minAge),
            maxAge: Number.parseInt(formData.maxAge),
            term: formData.term,
            minSum: formData.minSum,
            description: formData.description
          } 
        : policy
    ))
    setEditingPolicy(null)
  }

  const handleDelete = (id: number) => {
    setPolicies(policies.filter(policy => policy.id !== id))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddNew = () => {
    // In a real app, this would open a form to add a new policy
    alert("Add new policy functionality would be implemented here")
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Policy Management</h1>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Policy
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {policies.map((policy) => (
          <Card key={policy.id} className="p-4">
            <CardContent>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{policy.name}</h2>
                  <p className="text-sm text-gray-500">{policy.type}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(policy)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(policy.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {editingPolicy === policy.id ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Policy Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Policy Type</Label>
                    <Input
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="minAge">Minimum Age</Label>
                    <Input
                      id="minAge"
                      name="minAge"
                      type="number"
                      value={formData.minAge}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxAge">Maximum Age</Label>
                    <Input
                      id="maxAge"
                      name="maxAge"
                      type="number"
                      value={formData.maxAge}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="term">Term</Label>
                    <Input
                      id="term"
                      name="term"
                      value={formData.term}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="minSum">Minimum Sum</Label>
                    <Input
                      id="minSum"
                      name="minSum"
                      value={formData.minSum}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p><span className="font-medium">Age Range:</span> {policy.minAge} - {policy.maxAge} years</p>
                  <p><span className="font-medium">Term:</span> {policy.term}</p>
                  <p><span className="font-medium">Minimum Sum:</span> {policy.minSum}</p>
                  <p className="text-sm text-gray-600">{policy.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
