package excel;

import java.io.File;
import java.io.FileInputStream;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
// import org.apache.poi.ss.usermodel.CellType;

import pojo.ProjectDetailPojo;
import pojo.ProjectdetailBoolean;
import pojo.SubResourceBoolean;
import pojo.SubResourcePojo;

public class ReadExcel {

    private ProjectDetailPojo projectDetailPojo = new ProjectDetailPojo();
    private ProjectdetailBoolean projectdetailBoolean = new ProjectdetailBoolean();
    private SubResourceBoolean subResourceBoolean = new SubResourceBoolean();
    // private List<SubResourcePojo> subResourceList = new List<SubResourcePojo>();
    private int rowProgrammer;

    public ReadExcel() {
        projectdetailBoolean.setContractEnd(false);
        projectdetailBoolean.setContractStart(false);
        projectdetailBoolean.setCustomerCode(false);
        projectdetailBoolean.setProjectCode(true);
        projectdetailBoolean.setProjectName(false);

    }

    public ProjectDetailPojo read() {
        try {
            FileInputStream file = new FileInputStream(
                    new File("C:\\Users\\admin\\Downloads\\PD220002 (DLT) Team  Working  Period.xlsx"));
            // Create Workbook instance holding reference to .xlsx file
            XSSFWorkbook workbook = new XSSFWorkbook(file);

            // Get first/desired sheet from the workbook
            XSSFSheet sheet = workbook.getSheetAt(0);
            // System.out.println(sheet.getRow(9));
            // Iterate through each rows one by one
            Iterator<Row> rowIterator = sheet.iterator();
            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();

                // For each row, iterate through all the columns
                Iterator<Cell> cellIterator = row.cellIterator();
                while (cellIterator.hasNext()) {

                    Cell cell = cellIterator.next();
                    System.out.println("row : " + cell.getRowIndex() + ", col : " + cell.getColumnIndex());
                    // Check the cell type and format accordingly
                    switch (cell.getCellType()) {
                        case NUMERIC:
                            System.out.print(cell.getNumericCellValue() + "\t");
                            break;
                        case STRING:
                            System.out.print(cell.getStringCellValue() + "\t");
                            // Project Code
                            if (projectdetailBoolean.isProjectCode() && cell.getRowIndex() == 3
                                    && cell.getColumnIndex() == 2) {
                                projectdetailBoolean.setProjectCode(false);
                                projectDetailPojo.setProjectCode(cell.getStringCellValue());
                                projectdetailBoolean.setCustomerCode(true);

                            }
                            // Customer Code
                            else if (projectdetailBoolean.isCustomerCode() && cell.getRowIndex() == 3
                                    && cell.getColumnIndex() == 6) {
                                projectdetailBoolean.setCustomerCode(false);
                                projectDetailPojo.setCustomerCode(cell.getStringCellValue());
                                projectdetailBoolean.setProjectName(true);
                            }
                            // Project Name
                            else if (projectdetailBoolean.isProjectName() && cell.getRowIndex() == 4
                                    && cell.getColumnIndex() == 2) {
                                projectdetailBoolean.setProjectName(false);
                                projectDetailPojo.setProjectName(cell.getStringCellValue());
                                projectdetailBoolean.setContractStart(true);
                            }
                            // Contract Start
                            else if (projectdetailBoolean.isContractStart() && cell.getRowIndex() == 5
                                    && cell.getColumnIndex() == 2) {
                                projectdetailBoolean.setContractStart(false);
                                String cellValue = cell.getStringCellValue();
                                Date day = new Date(cell.getStringCellValue());
                                // day.setDate(cellValue.charAt(0)+ cellValue.charAt(1));
                                // day.setMonth(cellValue.charAt(3)+ cellValue.charAt(4));
                                // day.setYear(cellValue.charAt(6)+ cellValue.charAt(7) + + cellValue.charAt(8)+
                                // cellValue.charAt(9));
                                System.out.println(day);
                                projectDetailPojo.setContractStart(day);
                                projectdetailBoolean.setContractEnd(true);

                            } else if (projectdetailBoolean.isContractEnd() && cell.getRowIndex() == 5
                                    && cell.getColumnIndex() == 6) {
                                projectdetailBoolean.setContractEnd(false);
                                String cellValue = cell.getStringCellValue();
                                Date day = new Date(cell.getStringCellValue());
                                projectDetailPojo.setContractEnd(day);

                            } else if (cell.getStringCellValue().contains("Programmer")) {
                                rowProgrammer = cell.getRowIndex();
                            
                            }
                            break;
                    }
                    System.out.println("");

                }
                System.out.println("");

            }
            file.close();
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }

        return projectDetailPojo;
    }

    public int getRowProgrammer() {
        return rowProgrammer;
    }

    public void setRowProgrammer(int rowProgrammer) {
        this.rowProgrammer = rowProgrammer;
    }

}
