import Banner from './components/Banner/Banner';
import Companies from './components/Companies/Companies';
import Tabs from './components/Courses/Courses';
import Mentor from './components/Mentor/Mentor';
import Students from './components/Students/Students';
import Newsletter from './components/Newsletter/Newsletter';
import PricingTable from './components/Pricing/Pricing';
import CollegeBlogs from './components/Colleges/CollegeBlogs';

export default function Home() {
  return (
    <main>
      <Banner />
      <Companies />
      <CollegeBlogs/>
      {/* <Tabs /> */}
      <Mentor />
      <Students />
      <PricingTable/>
      {/* <Newsletter /> */}
    </main>
  )
}
