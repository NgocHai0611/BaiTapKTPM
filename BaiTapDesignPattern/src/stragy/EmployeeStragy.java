package stragy;

public class EmployeeStragy {
	private String idEmployee;
	private String nameEmployee;
	private SalaryStrategy salaryStrategy;
	
	public EmployeeStragy() {
		super();
		// TODO Auto-generated constructor stub
	}
	public EmployeeStragy(String idEmployee, String nameEmployee, SalaryStrategy salaryStrategy) {
		super();
		this.idEmployee = idEmployee;
		this.nameEmployee = nameEmployee;
		this.salaryStrategy = salaryStrategy;
	}
	public String getIdEmployee() {
		return idEmployee;
	}
	public void setIdEmployee(String idEmployee) {
		this.idEmployee = idEmployee;
	}
	public String getNameEmployee() {
		return nameEmployee;
	}
	public void setNameEmployee(String nameEmployee) {
		this.nameEmployee = nameEmployee;
	}
	public SalaryStrategy getSalaryStrategy() {
		return salaryStrategy;
	}
	public void setSalaryStrategy(SalaryStrategy salaryStrategy) {
		this.salaryStrategy = salaryStrategy;
	}
	@Override
	public String toString() {
		return "EmployeeStragy [idEmployee=" + idEmployee + ", nameEmployee=" + nameEmployee + ", salaryStrategy="
				+ salaryStrategy + "]";
	}
	
	
}
