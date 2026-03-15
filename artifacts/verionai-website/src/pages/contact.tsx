import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  intent: z.enum(["discovery", "demo"]).default("discovery")
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      message: "",
      intent: "discovery"
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    
    toast({
      title: "Message Received",
      description: "Our enterprise team will contact you shortly.",
    });
    
    form.reset();
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Let's Build Together</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Connect with our enterprise architects to see how VerionAI can transform your organizational workflows in days, not years.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="p-8 rounded-lg border border-white/10 bg-card">
              <Form {...form}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-300">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe" className="bg-background border-white/10 rounded-md" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-300">Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Acme Corp" className="bg-background border-white/10 rounded-md" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-gray-300">Work Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="jane@acmecorp.com" className="bg-background border-white/10 rounded-md" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-gray-300">How can we help?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your enterprise challenges or the systems you're looking to augment..." 
                            className="bg-background border-white/10 min-h-[120px] resize-none rounded-md" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button 
                      type="button" 
                      onClick={() => {
                        form.setValue('intent', 'discovery');
                        form.handleSubmit(onSubmit)();
                      }}
                      disabled={isSubmitting}
                      className="rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                    >
                      {isSubmitting && form.getValues('intent') === 'discovery' ? "Submitting..." : "Book a Discovery Call"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        form.setValue('intent', 'demo');
                        form.handleSubmit(onSubmit)();
                      }}
                      disabled={isSubmitting}
                      className="rounded-md border-white/20 hover:bg-white/5 text-white font-medium"
                    >
                      {isSubmitting && form.getValues('intent') === 'demo' ? "Submitting..." : "Request Demo"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="p-8 rounded-lg border border-white/10 bg-background space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm">enterprise@verionai.com</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Global Headquarters</h3>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm">Silicon Valley, CA<br/>Deployments worldwide.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
