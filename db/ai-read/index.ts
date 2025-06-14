/*
Exports read-only AI data models.
These are for querying data created by the AI worker.
DO NOT include in migrations - these tables are managed by the Python worker.
*/

export * from "./videos"
export * from "./channels" 
export * from "./relations" 