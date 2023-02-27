const Card=({name,englishName,procedure,targets,benefits,contraindications,updatedAt,image})=>{

return(
<div style={{backgroundImage:`url(${image})`
,backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'}} className='card'>

      
          <h1>{name}</h1>
          <h2>{englishName}</h2>
 
         
          <details>
          <summary>Procedure</summary>
          {procedure}
          </details>

          <details>
          <summary>Targets</summary>
          {targets}
          </details>
          <details>
          <summary>Benefits</summary>
          {benefits}
          </details>
          <details>
          <summary>Contra Indications</summary>
          {contraindications}
          </details>
          
        
  </div>
)

}
export default Card;