import Hero from "@/app/(home)/_components/Hero";
import Services from "@/app/(home)/_components/Services";
import Impact from "@/app/(home)/_components/Impact";
import Footer from "@/components/Footer";
import {Button} from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
        <Hero />
        <Services />
        <Impact />
        <Footer
            title="Collaboration drives measurable change."
            subTitle="Turning research into action to advance rural health equity."
            buttonOne={
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Partner With US
                </Button>
            }

            buttonTwo={
                <Button size="lg" variant="outline" className="border-none w-full sm:w-auto">
                    Support Our Work
                </Button>
            }
        />
    </>
  );
}
