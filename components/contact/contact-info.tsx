import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react"

export default function ContactInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start">
          <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Phone</h3>
            <p className="text-lg">+91 72308 24524</p>
            <p className="text-sm text-muted-foreground">Monday-Friday, 9am-5pm</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="p-3 rounded-full bg-secondary/10 text-secondary mr-4">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Email</h3>
            <p className="text-lg">atom.print05@gmail.com</p>
            <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="p-3 rounded-full bg-blue-500/10 text-blue-500 mr-4">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Location</h3>
            <p className="text-lg">123 University Ave, Campus Hub</p>
            <p className="text-sm text-muted-foreground">Suite 101, Innovation Building</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="p-3 rounded-full bg-amber-500/10 text-amber-500 mr-4">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Hours of Operation</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <p>Monday - Friday:</p>
              <p>9:00 AM - 5:00 PM</p>
              <p>Saturday:</p>
              <p>10:00 AM - 2:00 PM</p>
              <p>Sunday:</p>
              <p>Closed</p>
            </div>
          </div>
        </div>

        <Button className="w-full" variant="outline" asChild>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
            Get Directions
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
