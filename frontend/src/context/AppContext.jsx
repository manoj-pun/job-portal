import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);

  const [jobs, setJobs] = useState([]);

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userApplications,setUserApplications] = useState([]);

  //function to fetch jobs
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/jobs");
      if (data.success) {
        setJobs(data.jobs);
        console.log(data.jobs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //function to fetch company data
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/company", {
        headers: { token: companyToken },
      });
      // console.log(data)
      if (data.success) {
        setCompanyData(data.company);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //function to fetch user data
  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/users/user", {
        headers: { token: userToken },
      });
      console.log(data);
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchJobs();

    const storedCompanyToken = localStorage.getItem("companyToken");
    // console.log(storedCompanyToken)

    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }

    const storedUserToken = localStorage.getItem("userToken");
    if (storedUserToken) {
      setUserToken(storedUserToken);
    }
  }, []);

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  useEffect(() => {
    if (userToken) {
      fetchUserData();
    }
  }, [userToken]);

  const value = {
    searchFilter,setSearchFilter,
    isSearched,setIsSearched,
    jobs,setJobs,
    showRecruiterLogin,setShowRecruiterLogin,
    showLogin,setShowLogin,
    companyToken,setCompanyToken,
    companyData,setCompanyData,
    backendUrl,
    userToken,setUserToken,
    userData,setUserData,
  };

  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  );
};
