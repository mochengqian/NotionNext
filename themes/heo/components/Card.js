const Card = ({ children, headerSlot, className }) => {
  return <div className={`${className || ''} card rounded-xl border lg:p-5 p-4`}>
    <>{headerSlot}</>
    <section>
        {children}
    </section>
  </div>
}
export default Card
