import { Link } from 'react-router-dom';
import { Droplet, Users, Building, Search } from 'lucide-react';
import { useSlideIn, useFadeIn, StaggerChildren, AnimatedCard } from '../utils/animations';

const Home = () => {
  // Animation styles using our custom hooks
  const headerStyle = useFadeIn(0, 800);
  const descriptionStyle = useFadeIn(300, 800);
  
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4" style={headerStyle}>
          <Droplet className="h-12 w-12 text-blood-red animate-heartbeat" />
          <h1 className="text-5xl font-bold ml-2">Blood<span className="text-blood-red">Link</span></h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto" style={descriptionStyle}>
          Connecting blood donors, recipients, and blood banks efficiently through an intuitive interface.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <StaggerChildren staggerDelay={150}>
          {/* Recipient Card */}
          <AnimatedCard>
            <Link 
              to="/recipient" 
              className="card flex flex-col items-center p-8 border-t-4 border-blood-red h-full"
            >
              <Search className="h-16 w-16 text-blood-red mb-4" />
              <h2 className="text-2xl font-bold mb-2">Recipient</h2>
              <p className="text-center text-gray-600">
                Find nearby blood banks and check availability of blood types you need.
              </p>
            </Link>
          </AnimatedCard>

          {/* Donor Card */}
          <AnimatedCard>
            <Link 
              to="/donor/login" 
              className="card flex flex-col items-center p-8 border-t-4 border-blood-red h-full"
            >
              <Users className="h-16 w-16 text-blood-red mb-4" />
              <h2 className="text-2xl font-bold mb-2">Donor</h2>
              <p className="text-center text-gray-600">
                Register as a donor and find opportunities to donate blood and save lives.
              </p>
            </Link>
          </AnimatedCard>

          {/* BloodBank Card */}
          <AnimatedCard>
            <Link 
              to="/bloodbank/login" 
              className="card flex flex-col items-center p-8 border-t-4 border-blood-red h-full"
            >
              <Building className="h-16 w-16 text-blood-red mb-4" />
              <h2 className="text-2xl font-bold mb-2">BloodBank</h2>
              <p className="text-center text-gray-600">
                Manage your blood bank inventory and connect with potential donors.
              </p>
            </Link>
          </AnimatedCard>
        </StaggerChildren>
      </div>

      <div className="mt-16 bg-gray-100 p-8 rounded-lg max-w-5xl w-full animate-slideInUp">
        <h2 className="text-2xl font-bold mb-4 text-center">Why Choose BloodLink?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StaggerChildren staggerDelay={200}>
          <div className="text-center">
            <div className="bg-blood-red text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              1
            </div>
            <h3 className="font-bold mb-2">Quick Access</h3>
            <p className="text-gray-600">Find blood banks near you with real-time location services.</p>
          </div>
          <div className="text-center">
            <div className="bg-blood-red text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              2
            </div>
            <h3 className="font-bold mb-2">Secure Platform</h3>
            <p className="text-gray-600">Your data is protected with our secure authentication system.</p>
          </div>
          <div className="text-center">
            <div className="bg-blood-red text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              3
            </div>
            <h3 className="font-bold mb-2">Save Lives</h3>
            <p className="text-gray-600">Connect donors with recipients efficiently when time matters most.</p>
          </div>
          </StaggerChildren>
        </div>
      </div>
    </div>
  );
};

export default Home;