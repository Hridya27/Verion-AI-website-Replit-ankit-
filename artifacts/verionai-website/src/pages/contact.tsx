import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Calendar } from "lucide-react";

const pink = "#D4196A";
const purple = "hsl(262 83% 55%)";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  intent: z.enum(["discovery", "demo"]).default("discovery"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", company: "", email: "", phone: "", message: "", intent: "discovery" },
  });

  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(data[k] ?? ""))
      .join("&");

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          name: data.name,
          company: data.company,
          email: data.email,
          phone: data.phone ?? "",
          message: data.message,
          intent: data.intent,
        }),
      });
      toast({
        title: "Enquiry sent!",
        description: "We've received your message and will be in touch within 1 business day.",
      });
      form.reset();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please email us directly at info@verionai.in",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: purple }}>
            Contact Us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 text-gray-950">Let's Build Together</h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Connect with our enterprise architects to see how VerionAI can transform your organizational workflows in days, not years.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="enterprise-card p-8">
              <Form {...form}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe" className="rounded-md border-gray-300 bg-white text-gray-900 placeholder:text-gray-400" {...field} />
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
                          <FormLabel className="text-sm font-medium text-gray-700">Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Acme Corp" className="rounded-md border-gray-300 bg-white text-gray-900 placeholder:text-gray-400" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Work Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="jane@acmecorp.com" className="rounded-md border-gray-300 bg-white text-gray-900 placeholder:text-gray-400" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Phone <span className="text-gray-400 font-normal">(optional)</span></FormLabel>
                          <FormControl>
                            <Input placeholder="+1 555 000 0000" className="rounded-md border-gray-300 bg-white text-gray-900 placeholder:text-gray-400" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">How can we help?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your enterprise challenges or the systems you're looking to augment..."
                            className="rounded-md border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <Button
                      type="button"
                      onClick={() => { form.setValue("intent", "discovery"); form.handleSubmit(onSubmit)(); }}
                      disabled={isSubmitting}
                      className="rounded-md text-white font-semibold text-sm"
                      style={{ backgroundColor: pink }}
                    >
                      {isSubmitting ? "Submitting…" : "Book a Discovery Call"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => { form.setValue("intent", "demo"); form.handleSubmit(onSubmit)(); }}
                      disabled={isSubmitting}
                      className="rounded-md border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50"
                    >
                      Request a Demo
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            {[
              {
                icon: <Mail className="w-4 h-4" style={{ color: pink }} />,
                label: "Email",
                value: "info@verionai.in",
                href: "mailto:info@verionai.in",
              },
              {
                icon: <MapPin className="w-4 h-4" style={{ color: purple }} />,
                label: "Headquarters",
                value: "Global operations with sovereign cloud deployments worldwide.",
              },
              {
                icon: <Calendar className="w-4 h-4" style={{ color: pink }} />,
                label: "Response Time",
                value: "Our enterprise team responds within 1 business day.",
              },
            ].map((item, i) => (
              <div key={i} className="enterprise-card p-6">
                <div className="flex items-center gap-3 mb-2">
                  {item.icon}
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{item.label}</span>
                </div>
                {"href" in item ? (
                  <a href={(item as { href: string }).href} className="text-sm font-medium hover:underline" style={{ color: pink }}>
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm text-gray-700">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
