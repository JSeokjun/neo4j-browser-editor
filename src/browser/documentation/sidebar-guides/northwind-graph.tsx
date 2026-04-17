/*
 * Copyright (c) "Neo4j"
 * Neo4j Sweden AB [http://neo4j.com]
 *
 * This file is part of Neo4j.
 *
 * Neo4j is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import React from 'react'
import { useT } from 'shared/i18n'

import { BuiltInGuideSidebarSlide } from '../../modules/Carousel/Slide'
import ManualLink from 'browser-components/ManualLink'
import { DrawerExternalLink } from 'browser-components/drawer/drawer-styled'

function Slide1() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <p className="lead">
        <em>{t('northwind.s1.lead')}</em>
      </p>
      <p>{t('northwind.s1.desc')}</p>
      <p>{t('northwind.s1.showHow')}</p>
      <ol className="big">
        <li>{t('northwind.s1.load')}</li>
        <li>{t('northwind.s1.index')}</li>
        <li>{t('northwind.s1.relate')}</li>
        <li>{t('northwind.s1.promote')}</li>
      </ol>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide2() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('northwind.s2.title')}</h3>
      <p className="lead">
        <em>{t('northwind.s2.lead')}</em>
      </p>
      <p>{t('northwind.s2.desc')}</p>
      <img
        src="./assets/images/northwind/product-category-supplier.png"
        className="img-responsive"
      />
      <p>{t('northwind.s2.csvNote')}</p>
      <hr />
      <ul className="undecorated">
        <li>
          {t('northwind.s2.loadProduct')}
          <pre className="pre-scrollable code runnable">
            {`LOAD CSV WITH HEADERS FROM "https://data.neo4j.com/northwind/products.csv" AS row
CREATE (n:Product)
SET n = row,
n.unitPrice = toFloat(row.unitPrice),
n.unitsInStock = toInteger(row.unitsInStock), n.unitsOnOrder = toInteger(row.unitsOnOrder),
n.reorderLevel = toInteger(row.reorderLevel), n.discontinued = (row.discontinued <> "0")`}
          </pre>
        </li>
        <li>
          {t('northwind.s2.loadCategory')}
          <pre className="pre-scrollable code runnable">
            {`LOAD CSV WITH HEADERS FROM "https://data.neo4j.com/northwind/categories.csv" AS row
CREATE (n:Category)
SET n = row`}
          </pre>
        </li>
        <li>
          {t('northwind.s2.loadSupplier')}
          <pre className="pre-scrollable code runnable">
            {`LOAD CSV WITH HEADERS FROM "https://data.neo4j.com/northwind/suppliers.csv" AS row
CREATE (n:Supplier)
SET n = row`}
          </pre>
        </li>
      </ul>
      <hr />
      <p>
        <a help-topic="help">:help</a> <a help-topic="cypher">cypher</a>{' '}
        <a help-topic="load-csv">LOAD CSV</a>
      </p>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide3() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('northwind.s3.title')}</h3>
      <p className="lead">
        <em>{t('northwind.s3.lead')}</em>
      </p>
      <pre className="pre-scrollable code runnable">
        CREATE INDEX FOR (p:Product) ON (p.productID)
      </pre>
      <pre className="pre-scrollable code runnable">
        CREATE INDEX FOR (p:Product) ON (p.productName)
      </pre>
      <pre className="pre-scrollable code runnable">
        CREATE INDEX FOR (c:Category) ON (c.categoryID)
      </pre>
      <pre className="pre-scrollable code runnable">
        CREATE INDEX FOR (s:Supplier) ON (s.supplierID)
      </pre>
      <hr />
      <p>
        <a help-topic="help">:help</a> <a help-topic="cypher">cypher</a>{' '}
        <a help-topic="create-index">CREATE INDEX</a>
      </p>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide4() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('northwind.s4.title')}</h3>
      <p className="lead">
        <em>{t('northwind.s4.lead')}</em>
      </p>
      <p>{t('northwind.s4.desc')}</p>
      <img
        src="./assets/images/northwind/product-graph.png"
        className="img-responsive"
      />
      <pre className="pre-scrollable code runnable">
        {`MATCH (p:Product),(c:Category)
WHERE p.categoryID = c.categoryID
CREATE (p)-[:PART_OF]->(c)`}
      </pre>
      <pre className="pre-scrollable code runnable">
        {`MATCH (p:Product),(s:Supplier)
WHERE p.supplierID = s.supplierID
CREATE (s)-[:SUPPLIES]->(p)`}
      </pre>
      <hr />
      <p>
        <a help-topic="help">:help</a> <a help-topic="cypher">cypher</a>{' '}
        <a help-topic="match">MATCH</a>
      </p>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide5() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('northwind.s5.title')}</h3>
      <p className="lead">
        <em>{t('northwind.s5.lead')}</em>
      </p>
      <p>{t('northwind.s5.desc')}</p>
      <img
        src="./assets/images/northwind/product-graph.png"
        className="img-responsive"
      />
      <hr />
      <ul className="undecorated">
        <li>
          {t('northwind.s5.q1')}
          <pre className="pre-scrollable code runnable">
            {`MATCH (s:Supplier)-->(:Product)-->(c:Category)
RETURN s.companyName as Company, collect(distinct c.categoryName) as Categories`}
          </pre>
        </li>
        <li>
          {t('northwind.s5.q2')}
          <pre className="pre-scrollable code runnable">
            {`MATCH (c:Category {categoryName:"Produce"})<--(:Product)<--(s:Supplier)
RETURN DISTINCT s.companyName as ProduceSuppliers`}
          </pre>
        </li>
      </ul>
      <hr />
      <p>
        <a help-topic="help">:help</a> <a help-topic="cypher">cypher</a>{' '}
        <a help-topic="match">MATCH</a> <a help-topic="return">RETURN</a>
      </p>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide6() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('northwind.s6.title')}</h3>
      <p className="lead">
        <em>{t('northwind.s6.lead')}</em>
      </p>
      <p>{t('northwind.s6.desc')}</p>
      <img
        src="./assets/images/northwind/customer-orders.png"
        className="img-responsive"
      />
      <ul className="undecorated">
        <li>
          {t('northwind.s6.loadCustomer')}
          <pre className="pre-scrollable code runnable">
            {`LOAD CSV WITH HEADERS FROM "https://data.neo4j.com/northwind/customers.csv" AS row
CREATE (n:Customer)
SET n = row`}
          </pre>
        </li>
        <li>
          {t('northwind.s6.loadOrder')}
          <pre className="pre-scrollable code runnable">
            {`LOAD CSV WITH HEADERS FROM "https://data.neo4j.com/northwind/orders.csv" AS row
CREATE (n:Order)
SET n = row`}
          </pre>
        </li>
      </ul>
      <hr />
      <p>
        <a help-topic="help">:help</a> <a help-topic="cypher">cypher</a>{' '}
        <a help-topic="load-csv">LOAD CSV</a>
      </p>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide7() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('northwind.s7.title')}</h3>
      <p className="lead">
        <em>{t('northwind.s7.lead')}</em>
      </p>
      <pre className="pre-scrollable code runnable">
        CREATE INDEX FOR (n:Customer) ON (n.customerID)
      </pre>
      <pre className="pre-scrollable code runnable">
        CREATE INDEX FOR (o:Order) ON (o.orderID)
      </pre>
      <hr />
      <p>
        <a help-topic="help">:help</a> <a help-topic="cypher">cypher</a>{' '}
        <a help-topic="create-index">CREATE INDEX</a>
      </p>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide8() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('northwind.s8.title')}</h3>
      <p className="lead">
        <em>{t('northwind.s8.lead')}</em>
      </p>
      <pre className="pre-scrollable code runnable">
        {`MATCH (n:Customer),(o:Order)
WHERE n.customerID = o.customerID
CREATE (n)-[:PURCHASED]->(o)`}
      </pre>
      <hr />
      <p>
        <a help-topic="help">:help</a> <a help-topic="cypher">cypher</a>{' '}
        <a help-topic="create">CREATE</a>
      </p>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide9() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('northwind.s9.title')}</h3>
      <p className="lead">
        <em>{t('northwind.s9.lead')}</em>
      </p>
      <p>{t('northwind.s9.desc')}</p>
      <p>{t('northwind.s9.promote')}</p>
      <img
        src="./assets/images/northwind/order-graph.png"
        className="img-responsive"
      />
      <pre className="pre-scrollable code runnable">
        {`LOAD CSV WITH HEADERS FROM "https://data.neo4j.com/northwind/order-details.csv" AS row
MATCH (p:Product), (o:Order)
WHERE p.productID = row.productID AND o.orderID = row.orderID
CREATE (o)-[details:ORDERS]->(p)
SET details = row,
details.quantity = toInteger(row.quantity)`}
      </pre>
      <p>
        <a help-topic="help">:help</a> <a help-topic="cypher">cypher</a>{' '}
        <a help-topic="match">MATCH</a> <a help-topic="load-csv">LOAD CSV</a>
      </p>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide10() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('northwind.s10.title')}</h3>
      <p className="lead">
        <em>{t('northwind.s10.lead')}</em>
      </p>
      <p>
        {t('northwind.s10.desc')}
        <pre className="pre-scrollable code runnable">
          {`MATCH (cust:Customer)-[:PURCHASED]->(:Order)-[o:ORDERS]->(p:Product),
  (p)-[:PART_OF]->(c:Category {categoryName:"Produce"})
RETURN DISTINCT cust.contactName as CustomerName, SUM(o.quantity) AS TotalProductsPurchased`}
        </pre>
      </p>
      <hr />
      <p>
        <a help-topic="help">:help</a> <a help-topic="cypher">cypher</a>{' '}
        <a help-topic="match">MATCH</a> <a help-topic="return">RETURN</a>
      </p>
    </BuiltInGuideSidebarSlide>
  )
}

function Slide11() {
  const t = useT()
  return (
    <BuiltInGuideSidebarSlide>
      <h3>{t('northwind.s11.title')}</h3>
      <ul className="undecorated">
        <li>
          <DrawerExternalLink href="https://neo4j.com/developer/guide-importing-data-and-etl/">
            Full Northwind import example
          </DrawerExternalLink>
        </li>
        <li>
          <ManualLink chapter="cypher-manual" page="/">
            Neo4j Cypher Manual
          </ManualLink>
        </li>
        <li>
          <ManualLink chapter="cypher-refcard" page="/">
            Cypher Refcard
          </ManualLink>
        </li>
        <li>
          <DrawerExternalLink href="https://neo4j.com/developer/">
            Developer resources
          </DrawerExternalLink>
        </li>
      </ul>
    </BuiltInGuideSidebarSlide>
  )
}

const title = 'Northwind Graph Guide'
const category = 'graphExamples'
const identifier = 'northwind-graph'
const slides = [
  <Slide1 key="s1" />,
  <Slide2 key="s2" />,
  <Slide3 key="s3" />,
  <Slide4 key="s4" />,
  <Slide5 key="s5" />,
  <Slide6 key="s6" />,
  <Slide7 key="s7" />,
  <Slide8 key="s8" />,
  <Slide9 key="s9" />,
  <Slide10 key="s10" />,
  <Slide11 key="s11" />
]

export default { title, category, identifier, slides }
