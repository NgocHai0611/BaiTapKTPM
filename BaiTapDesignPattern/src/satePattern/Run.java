package satePattern;



public class Run {
	public static void main(String[] args) {
		EmployeeStatePattern e = new EmployeeStatePattern("001" , "Hai" , new ThamNienState());
		EmployeeStatePattern e1 = new EmployeeStatePattern("002" , "Truong" , new TienSiState());

		System.out.println(e.tinhLuong());
		System.out.println(e1.tinhLuong());
	}
}
