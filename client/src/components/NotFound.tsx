import NotFoundImg from '../assets/img/notfoud.jpg';


const NotFoundComponent = () => {
  return (
    <>
        <h1 className='text-center'>Página no encontrada.</h1>
        <div style={styles.containerImg} className="contenedor">
            <img style={styles.image} src={NotFoundImg} alt="Not Found" />
        </div>
    </>
  );
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

export default NotFoundComponent;