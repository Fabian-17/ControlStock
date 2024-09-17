import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import Welcome from "../assets/img/welcome.jpg";

const WelcomePage = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <h1 className="text-center">Formotex</h1>
                <div style={styles.containerImg}>
                    <img style={styles.image} src={Welcome} alt="Imagen de Bienvenida" />
                </div>
            </div>
            <Footer />
        </>
    )
};

const styles = {
    containerImg: {
        display: 'flex',
        justifyContent: 'center',
    },
    image: {
        width: '60%',
        height: '550px',
    },
};

export default WelcomePage;