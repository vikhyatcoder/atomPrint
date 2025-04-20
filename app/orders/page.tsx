import type { Metadata } from "next"
import OrderTracker from "@/components/orders/order-tracker"
import PackingInfo from "@/components/orders/packing-info"
import SupportForm from "@/components/orders/support-form"
import FeedbackForm from "@/components/orders/feedback-form"

export const metadata: Metadata = {
  title: "Order Tracking | Atom Print",
  description: "Track your 3D printing orders, view packing information, and submit feedback or support requests.",
}

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Order Management</h1>
      <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-muted-foreground">
        Track your orders, view delivery information, and provide feedback on your 3D printed products.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <OrderTracker />
        <PackingInfo />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SupportForm />
        <FeedbackForm />
      </div>
    </div>
  )
}
