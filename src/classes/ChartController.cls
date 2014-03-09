public class ChartController{
    public List<AggregateResult> getPieData(){
        Integer lim = Integer.valueOf(ApexPages.currentPage().getParameters().get('limit'));
        return [SELECT Account.Name, Account.Id, SUM(Amount) TotalAmount
                FROM Opportunity
                WHERE Account.Id != null AND IsClosed = false
                GROUP BY Account.Name, Account.Id
                ORDER BY SUM(Amount) DESC
                LIMIT :lim];
    }
}