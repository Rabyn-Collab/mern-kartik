import ColorSection from "./ColorSection";
import DisplaySection from "./DisplaySection";
import { DiApple, DiCss3, DiRedis } from "react-icons/di";


const res = [
  {
    id: 1,
    label: 'Responsive',
    icon: <DiApple size={170} />,
    properties: [
      'Built-in responsiveness',
      'Mobile first fluid grid',
      'Fits any screen sizes',
      'PC Tablet and Mobile'
    ]
  },
  {
    id: 2,
    label: 'Standard CSS',
    icon: <DiCss3 size={170} />,
    properties: [
      'Standard CSS only',
      'Easy to learn',
      'No need for jQuery',
      'No JavaScript library'
    ]
  },
  {
    id: 3,
    label: 'Design',
    icon: <DiRedis size={170} />,
    properties: [
      'Paper like design',
      'Bold colors and shadows',
      'Equal across platforms',
      'Equal across devices'
    ]
  }

];

export default function Home() {
  return (
    <div >





      <DisplaySection />


      <main className="p-5">

        <div className="grid grid-cols-3  gap-5  max-md:grid-cols-2 max-sm:grid-cols-1 ">
          {res.map((item) => {
            return <div key={item.id} className=" flex flex-col justify-center items-center gap-5 pt-2 pb-7 shadow-lg ">
              <h1 >{item.label}</h1>

              <div className="transition-all ease-in-out hover:scale-110 duration-300  hover:-translate-y-5">
                {item.icon}
              </div>

              {item.properties.map((property) => {
                return <p key={property}>{property}</p>
              })}


            </div>

          })}
        </div>

        <ColorSection />

      </main>





    </div>
  )
}
