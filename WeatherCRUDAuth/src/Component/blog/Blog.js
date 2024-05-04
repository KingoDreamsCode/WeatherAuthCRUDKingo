
import { useEffect, useState } from "react";
import { db, auth, storage } from "../../config/firebase-config";
import Footer from './Footer'
import Header from './Header'
import './blog.css';
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";


function Blog() {
  const [WeatherList, setWeatherList] = useState([]);
  const [weatherLocation, setWeatherLocation] = useState("");
  const [weatherDate, setWeatherDate] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");
  const [updateLocation, setUpdateLocation] = useState("");
  const [weatherImage, setWeatherImage] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const WeatherCollectionRef = collection(db, "WeatherDetails");
  const imageListRef = ref(storage, "weatherImages/");

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const getWeatherList = async () => {
    try {
      const data = await getDocs(WeatherCollectionRef);
      const filterData = data.docs.map((doc, index) => ({
        ...doc.data(),
        id: doc.id,
        imageUrl: imageUrls[index],
      }));
      setWeatherList(filterData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getWeatherList();
  }, []);

  const deleteWeather = async (id) => {
    const WeatherDoc = doc(db, "WeatherDetails", id);
    await deleteDoc(WeatherDoc);
    getWeatherList();
  };

  const updateWeatherLocation = async (id) => {
    const WeatherDoc = doc(db, "WeatherDetails", id);
    await updateDoc(WeatherDoc, { Location: updateLocation });
    getWeatherList();
  };

  const submitWeatherDetails = async () => {
    try {
      await addDoc(WeatherCollectionRef, {
        Location: weatherLocation,
        Date: weatherDate,
        Description: weatherDescription,
        userId: auth?.currentUser?.uid,
      });
      getWeatherList();
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = async () => {
    if (!weatherImage) return;
    const imageName = `${weatherImage.name}_${v4()}`;
    const weatherImagesRef = ref(storage, `weatherImages/${imageName}`);
    try {
      uploadBytes(weatherImagesRef, weatherImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
        alert("Image Uploaded");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="con">
            <Header />
    <div className="container2">
      <div className="form">
       {WeatherList.map((Weather) => (
        <div className="" key={Weather.id}>
          <div className="">
            {Weather.imageUrl && <img src={Weather.imageUrl} alt="Weather Image" />}
            <h3>Location: {Weather.Location}</h3>
            <p>Date: {Weather.Date}</p>
            <p>Description: {Weather.Description}</p>
          </div>
          <div>
            <button onClick={() => deleteWeather(Weather.id)}>Delete</button>
            <input
              type="text"
              onChange={(e) => setUpdateLocation(e.target.value)}
              placeholder="Update Location"
            />
            <button onClick={() => updateWeatherLocation(Weather.id)}>New Location</button>
          </div>
        </div>
      ))}
     </div>

      <div className="form">
        <h1>Create A Weather Post Here</h1>
        <input
          className="data"
          onChange={(e) => setWeatherLocation(e.target.value)}
          placeholder="Location"
          type="text"
        />
        <br />
        <input
          className="data"
          onChange={(e) => setWeatherDate(e.target.value)}
          placeholder="Date"
          type="text"
        />
        <br />
        <textarea
          className="data"
          onChange={(e) => setWeatherDescription(e.target.value)}
          placeholder="Describe The Weather In the Location: Temperature, Humidity and state of the day"
        />
        <br />
        <input type="file" onChange={(e) => setWeatherImage(e.target.files[0])} />
        <br />
        <button className="button" onClick={() => {
          uploadImage();
          submitWeatherDetails();
        }}><i className="fa fa-upload" aria-hidden="true"></i>Post Weather Details</button>
      </div>
    </div>
    </div>
  );
}

export default Blog;






/*import { useEffect, useState } from "react";
import { db, auth, storage } from "../../config/firebase-config";
import Footer from './Footer'
import Header from './Header'
import './blog.css';
import {getDocs, collection, addDoc,
         deleteDoc, updateDoc, doc
  } from "firebase/firestore";
  import { ref, uploadBytes, listAll,getDownloadURL,  list} from "firebase/storage";
import { v4 } from "uuid";


  
  function Blog() {
    const [WeatherList, setWeatherList] = useState([]);
    const [weatherLocation, setWeatherLocation] = useState("");
    const [weatherDate, setWeatherDate] = useState("");
    const [weatherDescription, setWeatherDescription] = useState("");

    //Update Weather Location
    const [updateLocation, setUpdateLocation] = useState("");

    //File Upload state
    const [weatherImage, setWeatherImage] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const imageListRef = ref(storage, "weatherImages/")

    const WeatherCollectionRef = collection(db, "WeatherDetails");

    useEffect(() =>{
      listAll(imageListRef).then((response) => {
        response.items.forEach((item) =>{
          getDownloadURL(item).then((url) =>{
            setImageUrls((prev) => [...prev, null] );
          });
        });
      });
    },[]);
  
  
    const getWeatherList = async() => {
      try {
        const data = await getDocs(WeatherCollectionRef);
        const filterData = data.docs.map((doc) =>
         ({...doc.data(), id: doc.id}));
          console.log(filterData);
        setWeatherList(filterData);
      } catch (err) {
        console.error(err);
      }
    };
    useEffect(() => {
      getWeatherList();
    }, []);
    const deleteWeather = async (id) => {
      const WeatherDoc = doc(db, "WeatherDetails",id);
      await deleteDoc(WeatherDoc);
      getWeatherList();
    }
    const updateWeatherLocation = async (id) => {
      const WeatherDoc = doc(db, "WeatherDetails",id);
      await updateDoc(WeatherDoc, {Location: updateLocation});
      getWeatherList();
    }


    const submitWeatherDetails = async () =>{
      try{
      await addDoc(WeatherCollectionRef,
         {Location: weatherLocation,
          Date: weatherDate,
          Description: weatherDescription,
          userId: auth?.currentUser?.uid,

         });
         getWeatherList();
      }catch(error){
        console.error(error)
      }
    }
  
    const uploadImage =async ()=>{
      if(!weatherImage) return;
      const weatherImagesRef = ref(storage,`weatherImages/${weatherImage.name + v4()}`);
      try{
         uploadBytes(weatherImagesRef,weatherImage).then((snaphsot) =>{
          getDownloadURL(snaphsot.ref).then((url) =>{
            setImageUrls((prev) => [...prev, url])
          })
          alert("Image Uploaded")
        });
      }catch(error){
        console.error(error);
      }
    }

  return (
    <div className="container2">
      <Header />
      <div className="form">
        <h1>Create A Weather Post Here</h1>
        <input className = "data" onChange={(e) => setWeatherLocation(e.target.value)} placeholder="Location" type="text" /><br/>
        <input className="data"   onChange={(e) => setWeatherDate(e.target.value)} placeholder="Date" type="text"></input><br/>

        <textarea className="data" onChange={(e) => setWeatherDescription(e.target.value)}
           placeholder="Describe The Weather In the Location: Temperature, Humidity and state of the day"/><br/>
   
        <input type="file" onChange={(e) =>setWeatherImage(e.target.files[0])} /><br />
        <button className="" onClick={uploadImage}><i class="fa fa-upload" aria-hidden="true">Weather Image</i></button>
        <button className="button" onClick={submitWeatherDetails}>Post Weather Details</button>
      </div>
      {WeatherList.map((Weather) => (
         <div className="">
            <div className="form">
            {imageUrls.map((url) =>{
            return <img src={url}></img>
          })}
              <h6>Location:{Weather.Location}</h6>
              <p>Date: {Weather.Date}</p>
              <p>Description: {Weather.Description}</p>
           </div>
           <div>
              <button onClick={() => deleteWeather(Weather.id)}>Delete  Details</button>
            </div>
           <div>
            <input onChange={(e) => setUpdateLocation(e.target.value)} placeholder="Update Weather Location"/>
             <button onClick={() =>updateWeatherLocation(Weather.id)}>Update Location</button>
           </div>
        </div>
      ))}
       <Footer /> 
  </div>

  );
}

export default Blog;*/