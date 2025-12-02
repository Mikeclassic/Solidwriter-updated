import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="px-6 h-20 flex items-center border-b bg-card">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4"/> Back to Home
        </Link>
      </header>
      <main className="max-w-2xl mx-auto py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-6">How can we help?</h1>
        <p className="text-xl text-muted-foreground mb-12">Our team is ready to assist you with any issues or questions.</p>
        
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card p-8 rounded-2xl border shadow-sm flex flex-col items-center">
                <div className="p-4 bg-blue-100 text-blue-600 rounded-full mb-4">
                    <Mail className="h-8 w-8"/>
                </div>
                <h3 className="text-xl font-bold mb-2">Email Support</h3>
                <p className="text-muted-foreground mb-6 text-sm">Best for detailed inquiries. We typically respond within 24 hours.</p>
                <a href="mailto:support@solidwriter.com" className="text-primary font-bold hover:underline">support@solidwriter.com</a>
            </div>

            <div className="bg-card p-8 rounded-2xl border shadow-sm flex flex-col items-center">
                <div className="p-4 bg-green-100 text-green-600 rounded-full mb-4">
                    <MessageSquare className="h-8 w-8"/>
                </div>
                <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                <p className="text-muted-foreground mb-6 text-sm">Available for Enterprise plans during business hours.</p>
                <span className="text-muted-foreground font-medium">Coming Soon</span>
            </div>
        </div>
      </main>
    </div>
  );
}