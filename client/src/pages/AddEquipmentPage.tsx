import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import EquipmentForm from "../components/AddEquipmentForm";
import axios from 'axios';
import Swal from "sweetalert2";


const AddEquipment = () => {
    const handleAddEquipment = (equipmentData: { name: string, description: string, dateAdded: string, locationId: number, quantity: number }) => {
        axios.post('http://locahost:4000/equipments', equipmentData)
          .then(response => {
            console.log('Equipment added:', response.data);
            Swal.fire({
              icon: 'success',
              title: 'Equipment Added',
              text: 'The equipment was successfully added!',
            });
          })
          .catch(error => {
            console.error('Error adding equipment', error);
            Swal.fire({
              icon: 'error',
              title: 'Error adding equipment',
              text: 'There was an issue adding the equipment. Please try again.',
            });
          });
      };
    
  return (
    <>
      <Navbar />
      <EquipmentForm onSubmit={handleAddEquipment} />
      <Footer />
    </>
  );
};


export default AddEquipment;