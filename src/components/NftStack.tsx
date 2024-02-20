import MockNftOne from '@assets/mock-nft-one.jpg';
import MockNftTwo from '@assets/mock-nft-two.jpg';
import MockNftThree from '@assets/mock-nft-three.jpg';

const images = [MockNftOne, MockNftTwo, MockNftThree].sort(
  () => 0.5 - Math.random()
);

const NftStack = () => {
  return (
    <div className='stack px-12'>
      {images.map((image, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br from-gray-300 to-white rounded-lg overflow-hidden p-1 shadow shadow-gray-900 
          ${index === 1 && 'ml-12 !rotate-6'} 
          ${index === 2 && 'mr-12 !-rotate-3'}
        `}
        >
          <img src={image} alt={`Mock NFT ${index}`} className='rounded-t-lg' />
          <div className='font-mono py-2 px-1 text-cyan-800 text-xs'>
            Example NFT image #RX4W6T7
          </div>
        </div>
      ))}
    </div>
  );
};

export default NftStack;
