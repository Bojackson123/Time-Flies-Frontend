export default function ElectricPlug(props: { className?: string }) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M19 17.5C19 16.6716 18.3284 16 17.5 16H8C5.23858 16 3 13.7614 3 11C3 8.23858 5.23858 6 8 6H11V8H8C6.34315 8 5 9.34315 5 11C5 12.6569 6.34315 14 8 14H17.5C19.433 14 21 15.567 21 17.5C21 19.433 19.433 21 17.5 21H4C3.44772 21 3 20.5523 3 20C3 19.4477 3.44772 19 4 19H17.5C18.3284 19 19 18.3284 19 17.5Z" fill="currentColor" />
      <path d="M20 4H16V6H20C20.5523 6 21 5.55228 21 5C21 4.44772 20.5523 4 20 4Z" fill="currentColor" />
      <path d="M20 8H16V10H20C20.5523 10 21 9.55228 21 9C21 8.44772 20.5523 8 20 8Z" fill="currentColor" />
      <path d="M9 7C9 4.79086 10.7909 3 13 3H17C17.5523 3 18 3.44772 18 4V10C18 10.5523 17.5523 11 17 11H13C10.7909 11 9 9.20914 9 7Z" fill="currentColor" />
    </svg>
  );
}
