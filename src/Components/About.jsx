const About = () => {
  return (
    <div className="my-10 container mx-auto space-y-5">
      <img
        className="mx-auto"
        src="https://ld-wt73.template-help.com/tf/foodoko/chinese/images/icon-01-111x97.png"
        alt=""
      />
      <div className="space-y-5">
        <h1 className="text-2xl lg:text-7xl font-extrabold text-center lg:text-left">
          Welcome to <br className="hidden lg:block" />
          Quick Basket
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <img
            className="flex-1 w-full object-cover lg:h-[700px]"
            src="https://i.ibb.co/zW9y1mSB/about-2.jpg"
            alt="grocery-picture"
          />
          <div className="flex-1 space-y-5">
            <div className="space-y-3">
              <p className="text-xl font-semibold ">
                <span className="inline-block h-28 w-3 border-8 border-red-500 mr-3 float-left"></span>
                Looking to stock up for a cozy dinner, a weekend gathering, or
                just your daily essentials? At QuickBasket, we bring the market
                to your doorstep — fresh, reliable, and full of flavor. From
                farm-fresh produce to pantry must-haves, we handpick every item
                so you can enjoy quality ingredients without the hassle. Ready
                to rediscover the joy of grocery shopping?
              </p>
              <p className="text-base font-light italic">
                We are here for you every day, from 8:00 AM to 10:00 PM. Prefer
                to shop from the comfort of home? Order online or give us a call
                — it is quick, easy, and delivered right to your door!
              </p>
            </div>
            <img
              className="object-cover lg:h-[452px]"
              src="https://i.ibb.co/dwrq1GCB/about-1.jpg"
              alt="grocery-picture"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
