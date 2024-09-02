import React, { FC } from "react";

interface BrandingProps {
  image: string;
  title: string;
  message: string;
}

const Branding: FC<BrandingProps> = ({ image, title, message }) => {
  return (
    <div className="ps-4 hidden py-4 lg:block">
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <img
          src={`assets/images/ai/${image}.jpg`}
          alt={title} // Use the title for accessibility
          className="h-full w-full transform scale-x-100" // Assuming you want normal scaling
        />
        <div className="bg-default-950/40 absolute inset-0">
          <div className="flex h-full items-end justify-center">
            <div className="text-start p-6">
              <h5 className="mb-3 text-xl font-bold text-white">
                {title}
                <br />
              </h5>
              <p className="text-default-400 text-base font-medium">
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
