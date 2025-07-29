import '@/css/stars.css';

export default function Stars() {
  return (
    <>
      <div className='animate-fade-in -z-50'>
        <section className='stars'>
          <span className='star'></span>
          <span className='star'></span>
          <span className='star'></span>
          <span className='star'></span>
          <span className='star'></span>
          <span className='star'></span>
          <span className='star'></span>
          <span className='star'></span>
          <span className='star'></span>
          <span className='star'></span>
        </section>
        <section className='stars'>
          <span className='beam'></span>
          <span className='beam'></span>
          <span className='beam'></span>
          <span className='beam'></span>
          <span className='beam'></span>
          <span className='beam'></span>
          <span className='beam'></span>
          <span className='beam'></span>
          <span className='beam'></span>
          <span className='beam'></span>
        </section>
      </div>
    </>
  );
}

