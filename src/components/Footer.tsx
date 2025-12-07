import '@/css/footer.css';

export default function Footer() {
  return (
    <footer
      className={`
        lg:fixed lg:bottom-8 sm:left-16
        w-full flex justify-center lg:justify-start
        z-50 animate-fade-in
      `}
    >
      <span className='pb-5 text-gray-400 lg:text-base text-sm'>
        <a href='https://github.com/yigitgulmez' target='_blank'>
          © 2025
          <p
            className='text ps-2 inline-block relative'
            data-content='Yiğit Gülmez'
          >
            Yiğit Gülmez
          </p>
        </a>
      </span>
    </footer>
  );
}