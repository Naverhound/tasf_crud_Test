const {db_open_connection} = require ('../database/db_connection');

const get = async (req,res)=>{ // Get index CRUD page
    const db_connection = await db_open_connection();
    let query_result={}
    
    if(Object.keys(req.query).length !== 0 && req.query.id>0){ // Check if there's query parameters
        if(!req.query.id) return res.send({"status":200});// If theres no id parameter
        
        const sale = await db_connection.query(`
        SELECT sale.sale_id AS Folio, product.prod_name AS Producto,
            sale.amount AS Cantidad, product.unit_cost AS Precio_Unitario,
            (sale.amount*product.unit_cost) AS Total 
        FROM sales_descript AS sale 
        INNER JOIN  products AS product
            ON sale.product_id = product.id 
        WHERE sale.sale_id = ${req.query.id};
        `)
                .then(([result])=>{
                    return result;
                });
        query_result = sale;
        db_connection.close();
        
    }else{
        const sales = await db_connection.query(`
        SELECT sale.sale_id AS Folio, product.prod_name AS Producto,
            sale.amount AS Cantidad, product.unit_cost AS Precio_Unitario,
            (sale.amount*product.unit_cost) AS Total 
        FROM sales_descript AS sale 
        INNER JOIN  products AS product
            ON sale.product_id = product.id 
        ORDER BY Folio ;
        `
        )
            .then(([result])=>{
                
                return result;
            });
        query_result = sales;
        db_connection.close();
    }
    
    //console.log(query_result);
   return res.render('../views/index.ejs',
            {result: query_result,
            status:200
            },
            );
}

const post = async(req,res) => {

}

module.exports = {
    get,
    post
}