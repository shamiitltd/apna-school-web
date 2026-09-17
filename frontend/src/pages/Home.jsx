import { Hero } from "../components/Hero"
import { HomeFeatures } from "../components/HomeFeatures"
import { HomeMid } from "../components/HomeMid"
import { Three_Steps } from "../components/Three_Steps"
import { LaunchOffer } from "../components/LaunchOffer"
import { Footer } from "../components/Footer"
import { NewsletterHome } from "../components/NewsletterHome"

export const Home = () => {
    return (
        <>
            <Hero />
            <HomeFeatures />
            <HomeMid />
            <Three_Steps />
            <LaunchOffer />
            <NewsletterHome />
            <Footer />
        </>
    )
}