import Container from "../../../../../components/user/ui/Container/Container";
import HeroTitle from "./HeroTitle";
import HeroSubtitle from "./HeroSubtitle";

export default function HeroContent() {
    return (
        <div className="absolute inset-0 flex items-center">
            <Container>
                <div className="max-w-3xl">
                    <HeroTitle />
                    <HeroSubtitle />
                </div>
            </Container>
        </div>
    );
}