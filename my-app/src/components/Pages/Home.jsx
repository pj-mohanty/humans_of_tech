import '../../App.css';
import HeroSection from '../HeroSection';
import CardSection from './Cards';
import Footer from './Footer';

function Home(){
    return(
        <div className="app-container">
        <HeroSection />
        <CardSection />
        <Footer />
        </div>
    );
}
export default Home;
