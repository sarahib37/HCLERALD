import React, { useEffect } from 'react'
import HowBG from '../../assets/HowBG.webp'
import Sourcing from '../../assets/Sourcing.webp';
import Quality from '../../assets/Quality.webp';
import Global from '../../assets/Global.webp';
import Community from '../../assets/Community.webp';

function How() {
  
  useEffect(() => {
    window.scroll(0,0)
  })
  return (
    <section className='min-w-[160%] md:min-w-[100%] flex flex-col gap-12'>
        <div className='mt-[-3em] p-[10em] w-full font-archivo text-center' style={{backgroundImage: `url(${HowBG})`}}>
          <p className='text-[5em] font-bold'>HOW IT WORKS</p>
        </div>
        <div className="px-4 md:px-12 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-center">
        <img
          src={Sourcing}
          alt="Sourcing"
          className="w-full md:w-1/2 object-cover h-64"
        />
        <p className="text-[6em] md:text-[12em] font-bold">1</p>
        <div className="text-center md:text-left">
          <h3 className="text-2xl md:text-4xl font-archivo font-bold">Sourcing</h3>
          <p className="text-lg md:text-xl mt-2">
            We collaborate with local artisans to curate a selection of handmade products.
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-12 items-center">
        <div className="text-center md:text-left">
          <h3 className="text-2xl md:text-4xl font-archivo font-bold">Quality Assurance</h3>
          <p className="text-lg md:text-xl mt-2 w-100%">
            Each item undergoes rigorous quality checks to ensure it meets our high standards.
          </p>
        </div>
        <p className="text-[6em] md:text-[12em] font-bold">2</p>
        <img
          src={Quality}
          alt="Quality Assurance"
          className="w-full md:w-[68%] object-cover h-64"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-center">
        <img
          src={Global}
          alt="Global Distribution"
          className="w-full md:w-[80%] object-cover h-64"
        />
        <p className="text-[6em] md:text-[12em] font-bold">3</p>
        <div className="text-center md:text-left">
          <h3 className="text-2xl md:text-4xl font-archivo font-bold">Global Distribution</h3>
          <p className="text-lg md:text-xl mt-2">
            We manage logistics to ensure that our products reach customers efficiently, whether
            they are located locally or internationally.
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-12 items-center">
        <div className="text-center md:text-left">
          <h3 className="text-2xl md:text-4xl font-archivo font-bold">Community Engagement</h3>
          <p className="text-lg md:text-xl mt-2">
            We actively engage with the artisan community, providing resources and support to help
            their businesses thrive.
          </p>
        </div>
        <p className="text-[6em] md:text-[12em] font-bold">4</p>
        <img
          src={Community}
          alt="Community Engagement"
          className="w-full md:w-[40%] min-w-[40vw] object-cover h-64"
        />
      </div>
    </div> 
    </section>
  )
}

export default How