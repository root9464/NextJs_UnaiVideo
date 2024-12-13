export const GalleryPageFlow = () => {
  return (
    <div className='relative h-[calc(100%-113px)] w-full overflow-y-scroll px-4 py-5'>
      <h3 className='m-auto h-fit w-[320px] text-center text-sm'>
        Videos created in the free version are stored for <span className='text-uiLime'>24 hours.</span> With a connected wallet, storage is
        extended to <span className='text-uiLime'>3 days</span>.
      </h3>

      <appkit-button />
    </div>
  );
};
