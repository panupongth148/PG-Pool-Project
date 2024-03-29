package lib.excel;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.inject.Singleton;

import org.apache.commons.codec.binary.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
// import org.apache.poi.ss.usermodel.CellType;

import pojo.Excel.ExcelObject;
import pojo.Excel.BooleanObj.ProjectdetailBoolean;
import pojo.Excel.BooleanObj.SubResourceBoolean;
import project.Project;
import resource.Resource;
import sub.document.RequestResource;
import sub.document.SubProject;
import sub.document.WorkingDetail;

@Singleton
public class ReadExcel {

    private ExcelObject excelObject = new ExcelObject();
    private ProjectdetailBoolean projectdetailBoolean = new ProjectdetailBoolean();
    private SubResourceBoolean subResourceBoolean = new SubResourceBoolean();
    private Project project = new Project();
    private Resource resource;
    private SubProject subProject = new SubProject();
    private List<SubProject> listSubProject = new ArrayList<SubProject>();
    private List<Resource> resourceList = new ArrayList<Resource>();
    private boolean isProgrammer = false;
    private boolean isExtraRow = false;
    private String passPosition = "";
    private String projectCodeTemp;
    private boolean isResource = false;

    private WorkingDetail workingDetail;

    public ReadExcel() {
        projectdetailBoolean.setContractEnd(false);
        projectdetailBoolean.setContractStart(false);
        projectdetailBoolean.setCustomerCode(false);
        projectdetailBoolean.setProjectCode(true);
        projectdetailBoolean.setProjectName(false);

    }

    public ExcelObject read(byte[] bytes) {
        try {
            // FileInputStream file = new FileInputStream(
            // new File("C:\\Users\\admin\\Downloads\\PD220002 (DLT) Team Working
            // Period.xlsx"));
            // FileInputStream file = new FileInputStream(
            // new File("C:\\Users\\admin\\Downloads\\PD200071 (CDGS) Team Working
            // Period.xlsx"));
            // Create Workbook instance holding reference to .xlsx file

            InputStream file = new ByteArrayInputStream(bytes);
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
                    
                    // System.out.println("row : " + cell.getRowIndex() + ", col : " +
                    // cell.getColumnIndex());
                    // Check the cell type and format accordingly
                    switch (cell.getCellType()) {
                        case NUMERIC:
                        // sheet.getRow(1).getCell(0).setCellType(Cell.CELL_TYPE_NUMERIC);
                            // cell.setCellType(Cell.CELL_TYPE_NUMERIC);
                            if (this.isProgrammer) {
                                if (cell.getColumnIndex() == 6) {

                                    this.workingDetail.setDuration(cell.getNumericCellValue());
                                } else if (cell.getColumnIndex() == 7) {

                                    this.workingDetail.setWorking(cell.getNumericCellValue());
                                } else if (cell.getColumnIndex() == 8) {
                                    this.workingDetail.setAssigned(cell.getNumericCellValue());
                                    // System.out.println(this.workingDetail.getAssigned());;
                                    System.out.println("temp Project Code : ");
                                    System.out.println(this.getProjectCodeTemp());
                                    this.subProject.setProjectCode(this.getProjectCodeTemp());

                                    this.subProject.getWorkingDetail().add(this.workingDetail);
                                    this.isProgrammer = false;
                                    this.workingDetail = new WorkingDetail();

                                }
                            } else if (!this.isProgrammer && this.isExtraRow) {

                                if (cell.getColumnIndex() == 6) {

                                    this.workingDetail.setDuration(cell.getNumericCellValue());

                                } else if (cell.getColumnIndex() == 7) {
                                    this.workingDetail.setWorking(cell.getNumericCellValue());

                                } else if (cell.getColumnIndex() == 8) {

                                    this.workingDetail.setAssigned(cell.getNumericCellValue());
                                    this.subProject.getWorkingDetail().add(this.getWorkingDetail());
                                    this.setExtraRow(false);
                                }
                            }

                            break;
                        case STRING:
                            cell.setCellValue(cell.getStringCellValue());
                            // Project Code
                            if (projectdetailBoolean.isProjectCode() && cell.getRowIndex() == 3
                                    && cell.getColumnIndex() == 2) {
                                projectdetailBoolean.setProjectCode(false);
                                project.setProjectCode(cell.getStringCellValue());
                                projectdetailBoolean.setCustomerCode(true);
                                this.setProjectCodeTemp(cell.getStringCellValue());

                            }
                            // Check Programmer
                            System.out.println(cell.getStringCellValue());
                            System.out.println(cell.getStringCellValue().equals("Programmer"));
                            System.out.println((cell.getStringCellValue().contains("Programmer Specialist")
                            || cell.getStringCellValue().equalsIgnoreCase("programmer")));

                            System.out.println(StringUtils.equals(cell.getStringCellValue(),"Programmer"));


                            if (cell.getRowIndex() > 8
                                    && (cell.getStringCellValue().contains("Programmer Specialist")
                                            || cell.getStringCellValue().equalsIgnoreCase("programmer"))
                                    && cell.getColumnIndex() == 1) {

                                if (this.subProject != null && this.resource != null && this.resourceList != null
                                        && isResource) {
                                    this.listSubProject.add(this.subProject);
                                    this.resource.setProjects(this.listSubProject);
                                    this.resourceList.add(this.resource);
                                }
                                System.out.println(cell.getStringCellValue());
                                this.subProject = new SubProject();
                                this.listSubProject = new ArrayList<SubProject>();
                                this.resource = new Resource();
                                this.workingDetail = new WorkingDetail();
                                isProgrammer = true;
                                // this.setRow(true);
                                // System.out.println("is Programmer");
                                this.resource = new Resource();
                                this.resource.setPosition(cell.getStringCellValue());
                                this.setPassPosition(cell.getStringCellValue());
                                this.setResource(true);
                            }
                            // Check Not Programmer
                            if (cell.getRowIndex() > 8 && !cell.getStringCellValue().contains("Programmer")
                                    && cell.getColumnIndex() == 1 && cell.getStringCellValue() != "") {
                                isProgrammer = false;
                                this.setPassPosition(cell.getStringCellValue());
                            }
                            if (this.getPassPosition().contains("Programmer") && cell.getColumnIndex() == 1
                                    && cell.getStringCellValue() == "") {
                                this.setExtraRow(true);

                            }

                            // excecute Extra row
                            if (isExtraRow) {
                                // System.out.println(this.workingDetail.getDuration());
                                if (cell.getColumnIndex() == 4) {
                                    // this.subProject.getEndDate().add(cell.getStringCellValue());
                                    Date day = new SimpleDateFormat("dd/MM/yyyy").parse(cell.getStringCellValue());
                                    if (day.getYear() < 2500) {
                                        day.setYear(day.getYear() - 543);
                                        project.setContractStart(day);
                                    }
                                    this.workingDetail.setStartDate(day);
                                } else if (cell.getColumnIndex() == 5) {
                                    Date day = new SimpleDateFormat("dd/MM/yyyy").parse(cell.getStringCellValue());
                                    if (day.getYear() < 2500) {
                                        day.setYear(day.getYear() - 543);
                                        project.setContractStart(day);
                                    }
                                    this.workingDetail.setEndDate(day);
                                }

                            }
                            // Customer Code
                            else if (projectdetailBoolean.isCustomerCode() && cell.getRowIndex() == 3
                                    && cell.getColumnIndex() == 6) {
                                projectdetailBoolean.setCustomerCode(false);
                                project.setCustomerCode(cell.getStringCellValue());
                                projectdetailBoolean.setProjectName(true);
                            }
                            // Project Name
                            else if (projectdetailBoolean.isProjectName() && cell.getRowIndex() == 4
                                    && cell.getColumnIndex() == 2) {
                                projectdetailBoolean.setProjectName(false);
                                project.setProjectName(cell.getStringCellValue());
                                projectdetailBoolean.setContractStart(true);
                            }
                            // Contract Start
                            else if (projectdetailBoolean.isContractStart() && cell.getRowIndex() == 5
                                    && cell.getColumnIndex() == 2) {
                                projectdetailBoolean.setContractStart(false);
                                String cellValue = cell.getStringCellValue();
                                Date day = new SimpleDateFormat("dd/MM/yyyy").parse(cell.getStringCellValue());
                                // day.setDate(cellValue.charAt(0)+ cellValue.charAt(1));
                                // day.setMonth(cellValue.charAt(3)+ cellValue.charAt(4));
                                // day.setYear(cellValue.charAt(6)+ cellValue.charAt(7) + + cellValue.charAt(8)+
                                // cellValue.charAt(9));
                                if (day.getYear() < 2500) {
                                    day.setYear(day.getYear() - 543);
                                    project.setContractStart(day);
                                }

                                projectdetailBoolean.setContractEnd(true);
                                // Contract end
                            } else if (projectdetailBoolean.isContractEnd() && cell.getRowIndex() == 5
                                    && cell.getColumnIndex() == 6) {
                                projectdetailBoolean.setContractEnd(false);
                                String cellValue = cell.getStringCellValue();
                                Date day = new SimpleDateFormat("dd/MM/yyyy").parse(cell.getStringCellValue());
                                if (day.getYear() < 2500) {
                                    day.setYear(day.getYear() - 543);
                                    project.setContractStart(day);
                                }
                                project.setContractEnd(day);
                                // set empNo, prefix, firstName, lastName, startDate, endDate
                            } else if (isProgrammer) {

                                // empNo
                                if (cell.getColumnIndex() == 2) {
                                    this.resource.setEmpNo(cell.getStringCellValue());

                                }
                                // name
                                else if (cell.getColumnIndex() == 3) {
                                    String[] arrOfStr = cell.getStringCellValue().split(" ");
                                    String prefix = arrOfStr[0];
                                    String firstName = arrOfStr[1];
                                    String lastName = arrOfStr[2];
                                    this.resource.setPrefix(prefix);
                                    this.resource.setFirstName(firstName);
                                    this.resource.setLastName(lastName);

                                }
                                // startDate
                                else if (cell.getColumnIndex() == 4) {
                                    // Date date = new
                                    // SimpleDateFormat("dd/MM/yyyy").parse(cell.getStringCellValue());
                                    // this.subProject.getWorkingDetail().add(cell.getStringCellValue());
                                    Date day = new SimpleDateFormat("dd/MM/yyyy").parse(cell.getStringCellValue());
                                    if (day.getYear() < 2500) {
                                        day.setYear(day.getYear() - 543);
                                        project.setContractStart(day);
                                    }
                                    this.workingDetail.setStartDate(day);
                                }
                                // endDate
                                else if (cell.getColumnIndex() == 5) {

                                    Date day = new SimpleDateFormat("dd/MM/yyyy").parse(cell.getStringCellValue());
                                    Date date1 = new SimpleDateFormat("dd/MM/yyyy").parse(cell.getStringCellValue());
                                    if (date1.getYear() < 2500) {
                                        date1.setYear(date1.getYear() - 543);
                                        project.setContractStart(date1);
                                    }
                                    // System.out.println(date1);
                                    this.workingDetail.setEndDate(date1);
                                }

                            }
                            break;
                    }

                }

            }
            this.project.setHistory(false);
            this.listSubProject.add(this.subProject);
            this.resource.setProjects(this.listSubProject);
            this.resourceList.add(this.resource);
            file.close();

            excelObject.setProject(this.project);
            excelObject.setResourceList(this.resourceList);
        } catch (

        Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
        // System.out.println(project.getCustomerCode());
        // System.out.println(resource.getPrefix() + " " + resource.getFirstName() + " "
        // + resource.getLastName());
        return excelObject;
    }

    public String getPassPosition() {
        return passPosition;
    }

    public void setPassPosition(String passPosition) {
        this.passPosition = passPosition;
    }

    public boolean isExtraRow() {
        return isExtraRow;
    }

    public void setExtraRow(boolean isExtraRow) {
        this.isExtraRow = isExtraRow;
    }

    public String getProjectCodeTemp() {
        return projectCodeTemp;
    }

    public void setProjectCodeTemp(String projectCodeTemp) {
        this.projectCodeTemp = projectCodeTemp;
    }

    public boolean isResource() {
        return isResource;
    }

    public void setResource(boolean isResource) {
        this.isResource = isResource;
    }

    public WorkingDetail getWorkingDetail() {
        return workingDetail;
    }

    public void setWorkingDetail(WorkingDetail workingDetail) {
        this.workingDetail = workingDetail;
    }

}
