import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="container text-center">
          <Badge className="mb-4 px-3 py-1 text-sm bg-primary/20 text-primary border-primary/20">Gallery</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Photo Gallery</h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Browse through our collection of photos showcasing our events, client meetings, and achievements.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container">
          <Tabs defaultValue="events" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="awards">Awards & Recognition</TabsTrigger>
                <TabsTrigger value="office">Office & Team</TabsTrigger>
                <TabsTrigger value="clients">Client Meetings</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="events" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={`event-${item}`} className="overflow-hidden rounded-lg shadow-md">
                    <div className="relative h-64 w-full">
                      <Image
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                        alt={`Event ${item}`}
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-semibold">Financial Awareness Seminar {item}</h3>
                      <p className="text-sm text-muted-foreground">Educating clients about financial planning</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="awards" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={`award-${item}`} className="overflow-hidden rounded-lg shadow-md">
                    <div className="relative h-64 w-full">
                      <Image
                        src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                        alt={`Award ${item}`}
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-semibold">Top Performer Award {item}</h3>
                      <p className="text-sm text-muted-foreground">Recognition for outstanding performance</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="office" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={`office-${item}`} className="overflow-hidden rounded-lg shadow-md">
                    <div className="relative h-64 w-full">
                      <Image
                        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                        alt={`Office ${item}`}
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-semibold">Our Office Space {item}</h3>
                      <p className="text-sm text-muted-foreground">A comfortable environment for client meetings</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="clients" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={`client-${item}`} className="overflow-hidden rounded-lg shadow-md">
                    <div className="relative h-64 w-full">
                      <Image
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                        alt={`Client Meeting ${item}`}
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-semibold">Client Consultation {item}</h3>
                      <p className="text-sm text-muted-foreground">Providing personalized financial advice</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
