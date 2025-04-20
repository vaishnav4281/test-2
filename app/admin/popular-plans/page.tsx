"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, Plus, Save, Star } from "lucide-react"

interface PopularPlan {
  id: number
  name: string
  type: string
  minAge: number
  maxAge: number
  term: string
  minSum: string
  description: string
  image: string
  rating: number
  features: string[]
}

// Mock data for popular plans
const mockPopularPlans: PopularPlan[] = [
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
    rating: 4.8,
    features: [
      "Life cover during policy term",
      "Maturity benefit",
      "Death benefit",
      "Bonus accumulation"
    ]
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
    rating: 4.5,
    features: [
      "High coverage",
      "Affordable premiums",
      "Online purchase option",
      "Flexible term options"
    ]
  }
]

export default function PopularPlans() {
  const [plans, setPlans] = useState<PopularPlan[]>(mockPopularPlans)
  const [editingPlan, setEditingPlan] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    minAge: "",
    maxAge: "",
    term: "",
    minSum: "",
    description: "",
    rating: "",
    features: ""
  })

  const handleEdit = (plan: PopularPlan) => {
    setEditingPlan(plan.id)
    setFormData({
      name: plan.name,
      type: plan.type,
      minAge: plan.minAge.toString(),
      maxAge: plan.maxAge.toString(),
      term: plan.term,
      minSum: plan.minSum,
      description: plan.description,
      rating: plan.rating.toString(),
      features: plan.features.join(", ")
    })
  }

  const handleSave = () => {
    setPlans(plans.map(plan => 
      plan.id === editingPlan 
        ? { 
            ...plan, 
            name: formData.name,
            type: formData.type,
            minAge: Number.parseInt(formData.minAge),
            maxAge: Number.parseInt(formData.maxAge),
            term: formData.term,
            minSum: formData.minSum,
            description: formData.description,
            rating: Number.parseFloat(formData.rating),
            features: formData.features.split(",").map(f => f.trim())
          } 
        : plan
    ))
    setEditingPlan(null)
  }

  const handleDelete = (id: number) => {
    setPlans(plans.filter(plan => plan.id !== id))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddNew = () => {
    // In a real app, this would open a form to add a new plan
    alert("Add new plan functionality would be implemented here")
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Popular Plans Management
        </h1>
        <Button 
          onClick={handleAddNew}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className="bg-slate-900 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
                  <p className="text-sm text-blue-400">{plan.type}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(plan)}
                    className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(plan.id)}
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {editingPlan === plan.id ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-blue-400">Plan Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-slate-800 border-blue-500/50 text-white focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type" className="text-blue-400">Plan Type</Label>
                    <Input
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="bg-slate-800 border-blue-500/50 text-white focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rating" className="text-blue-400">Rating</Label>
                    <Input
                      id="rating"
                      name="rating"
                      type="number"
                      step="0.1"
                      value={formData.rating}
                      onChange={handleChange}
                      className="bg-slate-800 border-blue-500/50 text-white focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="features" className="text-blue-400">Features (comma separated)</Label>
                    <Input
                      id="features"
                      name="features"
                      value={formData.features}
                      onChange={handleChange}
                      className="bg-slate-800 border-blue-500/50 text-white focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <Button 
                    onClick={handleSave}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(plan.rating) ? 'text-blue-400' : 'text-blue-400/30'}`}
                        />
                      ))}
                    </div>
                    <span className="text-blue-400 font-medium">{plan.rating}/5.0</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-300">
                      <span className="text-blue-400 font-medium">Age Range:</span> {plan.minAge} - {plan.maxAge} years
                    </p>
                    <p className="text-gray-300">
                      <span className="text-blue-400 font-medium">Term:</span> {plan.term}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-blue-400 font-medium">Minimum Sum:</span> {plan.minSum}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-blue-400 font-medium mb-2">Key Features:</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 